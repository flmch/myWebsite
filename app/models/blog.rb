class Blog < ActiveRecord::Base
		validates :name, presence: true,
						  length: { minimum: 1};
		validates :content, presence: true,
						  length: { minimum: 1};
end
