import React, { useEffect, useState, useRef } from "react";
import "./Searching.css";
const logo = "https://img.icons8.com/material-outlined/24/null/search--v1.png";

export default function Searching() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const inputRef = useRef();
  const locationRef = useRef();

  const getData = async () => {
    const res = await fetch("https://api.github.com/users");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const Smash = (e) => {
    e.preventDefault();
    const jobValue = inputRef.current.value;
    const locationValue = locationRef.current.value;
    // setFilteredJobs(jobValue)
    const filtered = jobs.filter((item) => {
      if (
        item.login.toLowerCase().includes(jobValue.toLowerCase()) &&
        item.node_id.toLowerCase().includes(locationValue.toLowerCase())
      )
        return item;
    });
    setFilteredJobs(filtered);
  };

  return (
    <form onSubmit={Smash}>
      <section className="search">
        <div className="jobSearch">
          <Search justRef={inputRef} placeholder="Job Title" />
        </div>
        <div className="locationSearch">
          <Search
            justRef={locationRef}
            placeholder="where do you want to work"
          />
        </div>
        <div className="searchButton">
          <SearchButton onclick={Smash} />
        </div>
        <div className="jobCard">
          <Card jobs={filteredJobs.length > 0 ? filteredJobs : jobs} />
        </div>
      </section>
    </form>
  );
}

function Search({ placeholder, justRef }) {
  return (
    <>
      <img src={logo} alt="serach logo" />
      <input
        ref={justRef}
        type="search"
        placeholder={placeholder}
        className="searchField"
      />
    </>
  );
}

function SearchButton({ onclick }) {
  return (
    <button id="button" onClick={onclick}>
      Find jobs
    </button>
  );
}

function Card({ jobs }) {
  return (
    <>
      {jobs.map((curJob) => {
        return (
          <div className="card">
            <h3>{curJob.login}</h3>
            <p>{curJob.id}</p>
            <p>{curJob.node_id}</p>
          </div>
        );
      })}
    </>
  );
}
