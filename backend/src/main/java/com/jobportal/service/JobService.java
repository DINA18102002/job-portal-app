package com.jobportal.service;

import java.util.List;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.JobDTO;
import com.jobportal.exception.JobPortalException;

import jakarta.validation.Valid;


public interface JobService {

	public JobDTO postJob(@Valid JobDTO jobDTO) throws JobPortalException;

	public List<JobDTO> getAllJobs();

	public JobDTO getJob(String id) throws JobPortalException;

	public void applyJob(String id, ApplicantDTO applicantDTO) throws JobPortalException;

	public List<JobDTO> getJobsPostedBy(String id);

	public void changeAppStatus(Application application) throws JobPortalException;

}
