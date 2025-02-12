"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(isLoading) return; 

    setIsLoading(true);
    
    try {
      const data = await axios.post("/api/board", {name});

        console.log(data);

setName(""); // removes the current input , such that we can create another board


router.refresh();

      //2. Redirect to the dedicated board page
    } catch (error) {
      // . display the error message
    } finally {
      setIsLoading(false); // the loading after all the checks are done in db , is stopped
    }
  };


  return (
    <div className="bg-base-100 p-8 rounded-3xl space-y-8">
      <p className="font-bold text-lg">Create a new feedback board</p>
      
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
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <div className="mt-6">
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <span>
                <span className="loading loading-spinner loading-md"></span>
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
