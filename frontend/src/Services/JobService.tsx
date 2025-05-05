import axios from "axios";
import { error } from "console";
const base_url = "http://localhost:8080/jobs/";
const postJob = async (job: any) => {
  return axios
    .post(`${base_url}post`, job)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const getAllJobs = async () => {
  return axios
    .get(`${base_url}getAll`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};
const getJob = async (id: any) => {
  return axios
    .get(`${base_url}get/${id}`)
    .then((result) => result.data)
    .catch((error) => {
      throw error;
    });
};

export { postJob, getAllJobs, getJob };
