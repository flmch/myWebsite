class BlogsController < ApplicationController
	def index
		@blogs = Blog.all
	end

	def show
		@blog = Blog.find(params[:id])
	end

	def new
		@blog = Blog.new
	end

	def create
		@blog = Blog.new(blog_params)
		if @blog.save
			flash.notice = "new post \"#{@blog.name}\" created"
			redirect_to blog_path(@blog)
		else
            render "new"
		end
	end

	def edit
		@blog = Blog.find(params[:id])
	end

	def update
		@blog = Blog.find(params[:id])
		if @blog.update(blog_params)
			flash.notice = "\"#{@blog.name}\" updated"
		end
		redirect_to blog_path(@blog)

	end

	def destroy
		@blog = Blog.find(params[:id])
		@blog.destroy

		flash.notice = "\"#{@blog.name}\" deleted"
		redirect_to blogs_path()
	end

	def blog_params
		params.require(:blog).permit(:name, :content,:code)
	end
end
