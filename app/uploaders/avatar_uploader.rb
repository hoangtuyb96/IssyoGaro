class AvatarUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
end
