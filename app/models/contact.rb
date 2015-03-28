class Contact < ActiveRecord::Base
	validates :firstname, presence: true,
						  length: { minimum: 2, maximum: 20};
    validates :lastname,  presence: true,
    					  length: { minimum:2, maximum: 20};
end
