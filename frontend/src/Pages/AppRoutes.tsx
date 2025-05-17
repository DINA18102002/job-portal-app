import { Divider } from "@mantine/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FindJobsPage from "./FindJobsPage";
import FindTalentPage from "./FindTalentPage";
import CompanyPage from "./CompanyPage";
import JobDescPage from "./JobDescPage";
import ApplyJobPage from "./ApplyJobPage";
import PostedJobPage from "./PostedJobPage";
import PostJobPage from "./PostJobPage";
import SignUpPage from "./SignUpPage";
import ProfilePage from "./ProfilePage";
import TalentProfilePage from "./TalentProfilePage";
import HomePage from "./HomePage";
import JobHistoryPage from "./JobHistoryPage";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";

const AppRoutes = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <BrowserRouter>
      <div className="relative">
        <Header />
        <Divider size="xs" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-job" element={<FindJobsPage />} />
          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/jobs/:id" element={<JobDescPage />} />
          <Route path="/apply-job/:id" element={<ApplyJobPage />} />
          <Route path="/company/:name" element={<CompanyPage />} />
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/posted-job" element={<PostedJobPage />} />
          <Route path="/job-history" element={<JobHistoryPage />} />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <SignUpPage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
