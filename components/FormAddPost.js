"use client"; //
import { useState } from "react"; // 
import { useRouter } from "next/navigation"; 
import axios from "axios"; //
import toast from "react-hot-toast"; // 

const FormAddPost = ({boardId}) => { //
  const router = useRouter(); // creating a router in client component , redirect to other page or for opening a page
  const [title, setTitle] = useState(""); // name connected to inputs in line 62
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false); //

  const handleSubmit = async (event) => { // form submit
    event.preventDefault(); // default submission prevention

    if(isLoading) return; 

    setIsLoading(true); // async call to API
    
    // API starts here
    try {
      console.log("Submitting to /api/post with boardId:", boardId);
      const response = await axios.post(`/api/post?boardId=${boardId}`, { title, description });

      console.log("Response:", response.data);

      setTitle(""); // removes the current input , such that we can create another board
      setDescription("");

      toast.success("Post created");

      router.refresh(); // page will not be refreshed , and then directly displayed the list of boards

      //2. Redirect to the dedicated board page
    } catch (error) {
      // . display the error message
      console.error("Error details:", error);
      const errorMessage = error.response?.data?.error || error.message || "Something went wrong";
      // error from the API endpoint
 
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // the loading after all the checks are done in db , is stopped
    }
  };

  return (
    <div className="bg-base-100 p-8 rounded-3xl space-y-8">
      <p className="font-bold text-lg">Suggest a feature</p>
      
      {/* Till line 65 taken the input form from daisyUI */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Short , descriptive title</span>
          </div>
          <input
            required
            type="text"
            placeholder="Green signals"
            className="input input-bordered w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)} // triggers this event whenever some input value changes , now we can type inside the form
            maxLength={100}
          />
        </label>

        {/* copied from daisyUI */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Description</legend>
          <textarea 
            className="textarea h-24" 
            placeholder="Describe your feature suggestion here"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <div className="fieldset-label">Optional</div>
        </fieldset>

        <div className="mt-6">
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <span>
                <span className="loading loading-spinner loading-md"></span>
              </span>
            )}
            Add post
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddPost;