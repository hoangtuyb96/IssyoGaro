class CoverUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave
end
