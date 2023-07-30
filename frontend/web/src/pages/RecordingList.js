import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Toggle,
  Upload,
  Filter,
} from "../assets/index";
import Swal from "sweetalert2";
import DateRange from "../components/DateRange";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function RecordingList() {
  // Numbering the table
  const [numbering, setNumbering] = useState(1);

  // Temporary storage
  const [recList, setRecList] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState(({
    dob: ""
  }))

  // Error Message
  const [error, setError] = useState("");

  // Get All Recordings
  const getRecList = async () => {
    const params = `?search=${search}`;
    try {
      const response = await fetch(
        `http://localhost:8082/recordingList/getAllRecordings${params}`
      );

      response.json().then((data) => {
        setRecList(data.data);
        console.log(data.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Delete Recording
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Deleting
        fetch(`http://localhost:8082/recordingList/deleteRecordingById/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(
            (result) => {
              getRecList();
            },
            (error) => {
              setError(error);
            }
          );

        // Success message
        Swal.fire("Deleted!", "The recording has been deleted!", "success");
        getRecList();
      }
    });
  };

  // Download Recording
  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    link.href = `https://localhost8082/${fileName}`
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    getRecList();
  }, []);

  return (
    <div className="mx-10">
      <p className="text-xl font-bold text-left mb-5">Recording List</p>

      <div class="grid grid-cols-2 mb-5">
        <form className="max-w-xs text-sm">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode == 13) {
                  getRecList();
                }
              }}
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />

            <div className="dropdown mb-4">
              <label
                tabIndex={0}
                className="absolute top-0 bottom-0 w-6 h-6 text-gray-400 right-3"
              >
                <img src={Filter} className=""></img>
              </label>
              <div
                tabIndex={0}
                className="-top-120 dropdown-content z-[1] menu p-5 drop-shadow-sm bg-[#FFFFFF] rounded-box w-128 disabled:hover text-xs border"
              >
                {/* Filter Pop up */}
                {/* Handled By */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Handled by</p>
                  <select
                    // value={gender}
                    // onChange={(e) => handleAssignEmployee(e.target.value)}
                    className="select select-bordered font-normal select-xs h-8"
                  >
                    <option value="">Any Employee</option>
                    <option value="existingEmployee">Existing Employee</option>
                    <option value="metadata">Metadata</option>
                    <option value="folderName">Folder Name</option>
                    <option value="splitFileName">Split File Name</option>
                    <option value="none">None</option>
                  </select>
                </div>

                {/* Category */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Category</p>
                  <select
                    // value={gender}
                    // onChange={(e) => handleAssignEmployee(e.target.value)}
                    className="select select-bordered font-normal select-xs h-8"
                  >
                    <option value="">Any Employee</option>
                    <option value="existingEmployee">Existing Employee</option>
                    <option value="metadata">Metadata</option>
                    <option value="folderName">Folder Name</option>
                    <option value="splitFileName">Split File Name</option>
                    <option value="none">None</option>
                  </select>
                </div>

                {/* Overall Sentiment */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Overall Sentiment</p>
                  <select
                    // value={gender}
                    // onChange={(e) => handleAssignEmployee(e.target.value)}
                    className="select select-bordered font-normal select-xs h-8"
                  >
                    <option value="">Any Employee</option>
                    <option value="existingEmployee">Existing Employee</option>
                    <option value="metadata">Metadata</option>
                    <option value="folderName">Folder Name</option>
                    <option value="splitFileName">Split File Name</option>
                    <option value="none">None</option>
                  </select>
                </div>

                {/* Date Recorded */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Date Recorded</p>
                  <DateRange
                    formData={formData}
                    setFormData={setFormData}
                  ></DateRange>
                </div>

                {/* Upload Date */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Upload Date</p>
                  <DateRange
                    formData={formData}
                    setFormData={setFormData}
                  ></DateRange>
                </div>

                {/* Employer's Sentiment */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Employer's Sentiment</p>
                  <select
                    // value={gender}
                    // onChange={(e) => handleAssignEmployee(e.target.value)}
                    className="select select-bordered font-normal select-xs h-8"
                  >
                    <option value="">Any Employee</option>
                    <option value="existingEmployee">Existing Employee</option>
                    <option value="metadata">Metadata</option>
                    <option value="folderName">Folder Name</option>
                    <option value="splitFileName">Split File Name</option>
                    <option value="none">None</option>
                  </select>
                </div>

                {/* Customer's Sentiment */}
                <div className="grid grid-cols-2 flex items-center mb-5">
                  <p className="font-bold">Customer's Sentiment</p>
                  <select
                    // value={gender}
                    // onChange={(e) => handleAssignEmployee(e.target.value)}
                    className="select select-bordered font-normal select-xs h-8"
                  >
                    <option value="">Any Employee</option>
                    <option value="existingEmployee">Existing Employee</option>
                    <option value="metadata">Metadata</option>
                    <option value="folderName">Folder Name</option>
                    <option value="splitFileName">Split File Name</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="flex justify-end items-center">
                  <p className="text-[#9554FE] mr-8 text-xs">Reset</p>
                  <button
                    className="btn btn-sm bg-[#9554FE] normal-case h-5 px-5 border-[#9554FE] text-xs"
                    // onClick={() => handleSave(data, empId)}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Upload */}
        <div className="place-self-end">
          <Link to="./AddRecording">
            <button className="btn btn-sm bg-[#9554FE] normal-case h-11 w-42 border-[#9554FE]">
              <img src={Upload} className="mr-2 h-5"></img>
              <p className="mr-2 text-md">Upload</p>
              <img src={Toggle} className="h-5"></img>
            </button>
          </Link>
        </div>
      </div>

      <div className="max-h-screen border border-dashed bg-[#F6F4FC]">
        {/* table */}
        <table className="table table-auto mx-auto w-full text-xs">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                No
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Recording name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Upload Date
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Date Recorded
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Employee Name
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Category
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm font-semibold">
                Sentiment
              </th>
              <th className="bg-[#F6F4FC] normal-case text-sm text-center font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {/* row 1 */}
            {recList.map((recording, index) => (
              <tr>
                <th className="h-1">{numbering + index}</th>
                <td className="h-1">{recording.recordingName}</td>
                <td className="h-1">{recording.uploadDate}</td>
                <td className="h-1">{recording.recordingDate}</td>
                <td className="h-1">{recording.employeeId}</td>
                <td className="h-1">Category</td>
                <td className="h-1">Sentiment</td>
                <td className="flex justify-center items-center">
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="bg-[#FFFFFF] border-[#FFFFFF] hover:bg-[#F6F4FC] hover:border-[#F6F4FC] hover:outline-none h-1"
                    >
                      {/* <img src={ThreeDotsVertical} className="mt-2"></img> */}
                      <MoreVertIcon style={{ color: "black" }}></MoreVertIcon>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu shadow bg-[#F6F4FC] rounded-box w-36 rounded-none"
                    >
                      <li className="hover:bg-[#9554FE]">
                        <a className="text-[#9554FE] hover:text-[#FFFFFF]">
                          <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>{" "}
                          View Analysis
                        </a>
                      </li>
                      <li className="hover:bg-[#9554FE]">
                        <a
                          className="text-[#D55454] hover:text-[#FFFFFF]"
                          onClick={() => handleDelete(recording.recordingId)}
                        >
                          <DeleteOutlinedIcon></DeleteOutlinedIcon> Delete
                        </a>
                      </li>
                      <li className="hover:bg-[#9554FE]">
                        <a
                          onClick={() =>
                            handleDownload(recording.recordingName)
                          }
                          className="text-[#9554FE] hover:text-[#FFFFFF]"
                        >
                          <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>{" "}
                          Download
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="join flex justify-end mt-10 mb-10">
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          1
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          2
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          3
        </button>
        <button className="join-item btn btn-sm bg-[#F6F4FC] text-black hover:bg-[#9554FE] hover:text-[#FFFFFF] border-[#9554FE] rounded">
          4
        </button>
      </div>
    </div>
  );
}

export default RecordingList;
