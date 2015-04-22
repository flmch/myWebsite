class Blog < ActiveRecord::Base
		validates :name, presence: true,
						 uniqueness: true
		validates :content, presence: true
		validates :code, presence: true
end
