import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const Editlinks = () => {
  const [links, setLinks] = useState([{ url: "", title: "" }]);
  const [title, setTitle] = useState("");

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: "", title: "" }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const saveLinks = (e) => {
    e.preventDefault();
    const linksArray = Object.values(links);
    const titlesArray = Object.values(title);
    const linksData = linksArray.map((link, index) => ({
      link,
      title: titlesArray[index],
    }));

    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/save/links`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
        links: linksData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);
        toast.success("Links saved successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API}/load/links`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem("LinkTreeToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") return toast.error(data.error);
        setLinks(data.links);
      });
  }, []);

  return (
    <>
      <div>
        <main>
          <section>
            <h1 className="text-center font-bold text-xl text-gray-600 mb-6 mt-8">
              Add or Customize your Links
            </h1>
            <div>
              <form onSubmit={saveLinks}>
                {links.map((link, index) => (
                  <div
                    className="flex flex-col md:flex-row justify-evenly pl-8 my-2 md:pl-0"
                    key={index}
                  >
                    <label>
                      Name:
                      <input
                        className="outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2 label-edit"
                        type="text"
                        value={link.title}
                        onChange={(e) =>
                          handleLinkChange(index, "title", e.target.value)
                        }
                      />
                    </label>
                    <label>
                      URL:
                      <input
                        className="outline-none border-2 border-gray-200 shadow-md rounded-md px-2 p-1 ml-2 label-edit url"
                        type="text"
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(index, "url", e.target.value)
                        }
                      />
                    </label>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm ml-3 remove"
                      type="button"
                      onClick={() => {
                        handleRemoveLink(index);
                      }}
                    >
                      Remove Link
                    </button>
                  </div>
                ))}
                <div className="buttons flex flex-col gap-5 mt-1 justify-center items-center">
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm ml-9 md:ml-0 w-52 md:w-44 mt-5"
                    type="button"
                    onClick={handleAddLink}
                  >
                    + Add link
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm ml-9 md:ml-0 w-52 md:w-44 mb-4"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Editlinks;
