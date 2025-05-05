package com.jobportal.service;

import java.util.List;

import com.jobportal.dto.JobDTO;
import com.jobportal.exception.JobPortalException;


public interface JobService {

	public JobDTO postJOb(JobDTO jobDTO) throws JobPortalException;

	public List<JobDTO> getAllJobs();

	public JobDTO getJob(Long id) throws JobPortalException;

}
