class AddColumnToBlog < ActiveRecord::Migration
  def change
    add_column :blogs, :code, :text
  end
end
