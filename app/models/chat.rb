class Chat < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[context]

  belongs_to :group
  belongs_to :user
end
