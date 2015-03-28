class ContactController < ApplicationController
	def index
		@contact = Contact.new
	end

	def create
		@contact = Contact.new(contact_param)

		if @contact.save
			flash.notice = "Message Sent! Thank you!"
		else
			flash.notice = "Message not sent, please correct required field"
		end
		redirect_to contact_index_path
	end

	private

	def contact_param
		params.require(:contact).permit(:firstname,:lastname,:subject,:message)
	end
end
