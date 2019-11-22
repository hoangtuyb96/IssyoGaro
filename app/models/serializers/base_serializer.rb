class Serializers::BaseSerializer
  def initialize(args)
    @object = args[:object]
    @class_name = args[:class_name].to_s
    @scope = args[:scope]
    @scope&.each do |key, value|
      instance_variable_set "@#{key}", value
    end
  end

  def serializer
    if class_is_relation?
      multi_serializer
    elsif @class_name.present? && self.class.to_s != @class_name
      object_serializer =
        @class_name.constantize.new object: @object, scope: @scope,
                                    class_name: @class_name
      object_serializer.serializer
    else
      single_serializer
    end
  end

  def multi_serializer
    return [] if @object.empty?

    class_name = get_class_name.constantize
    @object.map do |object|
      object_serializer = class_name.new object: object, scope: @scope
      object_serializer.serializer
    end
  end

  def single_serializer
    serializers = {}
    return serializers unless @object

    attributes.each do |attribute|
      instance_variable_set "@#{attribute}", @object[attribute.to_s]
      serializers[attribute.to_sym] = send attribute
    end
    serializers
  end

  def attributes
    attributes = get_attributes
    self.class.conditions.each do |key, value|
      attributes.delete key unless send(value)
    end
    attributes
  end

  def get_attributes
    superclass = get_class
    attributes = []
    while superclass != Serializers::BaseSerializer
      attributes += superclass.attributes
      superclass = superclass.superclass
    end
    attributes
  end

  def get_class
    superclass ||= @class_name.constantize if @class_name.present?
    superclass || self.class
  end

  def class_is_relation?
    class_object = @object.class
    superclass = class_object.superclass
    superclass == ActiveRecord::Relation || superclass.superclass ==
      ActiveRecord::Relation || class_object == Array
  end

  def get_class_name
    return @class_name if @class_name.present?

    class_self = self.class
    if class_self == Serializers::BaseSerializer
      sub_class = get_super_class @object.first.class
      "Serializers::#{sub_class.to_s.pluralize}Serializer"
    else
      class_self.to_s
    end
  end

  def get_super_class(obj_class)
    get_super_class obj_class.superclass if obj_class != ApplicationRecord
    obj_class
  end

  class << self
    def attrs(*vars)
      vars = support_attrs(*vars)
      vars.each do |var|
        define_method var do
          instance_variable_get "@#{var}"
        end
      end
    end

    def support_attrs(*vars)
      vars = attributes_with_condition vars
      attributes.concat vars
      vars
    end

    def attributes
      @attributes ||= []
    end

    def conditions
      @conditions ||= {}
    end

    private

    def attributes_with_condition(vars)
      var_last = vars.last
      if var_last.class == Hash
        vars.delete var_last
        vars.each do |var|
          conditions[var.to_s.to_sym] = var_last[:if]
        end
      end
      vars
    end
  end
end
