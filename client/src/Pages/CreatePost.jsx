import { FileInput, Select, TextInput, Button, Textarea } from "flowbite-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
export const CreatePost = () => {
  const editor = useEditor({
    extensions: [StarterKit], // Basic text formatting (bold, italic, etc.)
    content: "<p>Hello, start typing...</p>", // Default content
  });

  return (
    <div className="min-h-screen max-w-3xl mx-auto p-3 ">
      <h1 className="text-3xl mt-3 mb-3 text-center">Create a post</h1>
      <form className="mx-8">
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-between">
          <TextInput
            className="flex-1"
            placeholder="Title"
            required
            name="title"
          ></TextInput>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="react">React</option>
          </Select>
        </div>
        <div className="flex justify-between gap-4 mt-4 border-4 border-dotted p-4 border-gray-400">
          <FileInput className="flex-1"></FileInput>
          <Button gradientDuoTone="pinkToOrange" outline>
            Upload Image
          </Button>
        </div>
        <Textarea
          className="min-h-[200px] border rounded-md mt-4 p-2 mb-4"
          placeholder="Write something..."
          required
        ></Textarea>
        <Button
          className="w-full"
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
        >
          Publish
        </Button>
      </form>
    </div>
  );
};
