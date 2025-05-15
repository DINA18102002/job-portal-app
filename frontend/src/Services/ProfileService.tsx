import axios from "axios";
const base_url = "http://localhost:8080/profiles/";

const getProfile = async (id: number) => {
  return axios
    .get(`${base_url}get/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const updateProfile = async (profile: any) => {
  if (!profile?.id) {
    console.error("Update failed - Missing profile ID in:", profile);
    throw new Error("Profile ID is required for update");
  }
  return axios
    .put(`${base_url}update`, profile)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { getProfile, updateProfile };
