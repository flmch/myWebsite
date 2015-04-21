class Blog < ActiveRecord::Base
		validates :name, presence: true,
						  length: { minimum: 1, maximum: 50};
		validates :content, presence: true,
						  length: { minimum: 1};
end
