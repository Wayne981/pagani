const FormNewBoard = () => {
    return (
        // 1. TITLE
        // 2. FORM
        // 3. BUTTON
        <form className="bg-base-100 p-8 rounded-3xl space-y-8">
            <p className="font-bold text-lg">Create a new feedback board</p>
            <label className="form-control w-full">
                <div className="label-text">Board name</div>
                <input 
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
            </label>
            <button className="btn btn-primary w-full">Create board</button>
        </form>
    );
};

export default FormNewBoard;
