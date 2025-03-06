"use client"; //
import { useState } from "react"; // 
import { useRouter } from "next/navigation"; 
import axios from "axios"; //
import toast from "react-hot-toast"; // 

const FormNewBoard = () => { //
  const router = useRouter(); // creating a router in client component , redirect to other page or for opening a page
  const [name, setName] = useState(""); // name connected to inputs in line 62
  const [isLoading, setIsLoading] = useState(false); //

  const handleSubmit = async (event) => { // form submit
    event.preventDefault(); // default submission prevention

    if(isLoading) return; 

    setIsLoading(true); // async call to API
    
    // API starts here
    try {
      const data = await axios.post("/api/board", {name});

        console.log(data);

setName(""); // removes the current input , such that we can create another board

toast.success("Board created");

router.refresh(); // page will not be refreshed , and then directly displayed the list of boards

      //2. Redirect to the dedicated board page
    } catch (error) {
      // . display the error message

     

      const errorMessage = error.response?.data?.error || error.message || "Something went wrong";
      // error from the API endpoint
 
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // the loading after all the checks are done in db , is stopped
    }
  };


  return (
    <div className="bg-base-100 p-8 rounded-3xl space-y-8">
      <p className="font-bold text-lg">Create a new feedback board</p>
      

      {/* Till line 65 taken the input form from daisyUI */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Board name</span>
          </div>
          <input
            required
            type="text"
            placeholder="Future Whale 🐋"
            className="input input-bordered w-full"
            value={name}
            onChange={(event) => setName(event.target.value)} // triggers this event whenever some input value changes , now we can type inside the form
          />
        </label>

        <div className="mt-6">
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <span>
                <span className="loading loading-spinner loading-md"></span> nt
              </span>
            )}
            Create Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNewBoard;
