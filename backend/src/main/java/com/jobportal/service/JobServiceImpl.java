package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.JobStatus;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.Utilities;

@Service("jobService")
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
        if (jobDTO.getId() == null || jobDTO.getId().isBlank()) {
            jobDTO.setPostTime(LocalDateTime.now());

            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setAction("Job Posted");
            notificationDTO.setMessage("Job posted successfully for " + jobDTO.getJobTitle());
            notificationDTO.setUserId(jobDTO.getPostedBy());
            notificationDTO.setRoute("/posted-jobs/" + jobDTO.getId());

            try {
                notificationService.sendNotification(notificationDTO);
            } catch (JobPortalException e) {
                throw new RuntimeException(e);
            }
        } else {
            Job job = jobRepository.findById(jobDTO.getId())
                    .orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
            if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED)) {
                jobDTO.setPostTime(LocalDateTime.now());
            }
        }

        return jobRepository.save(jobDTO.toEntity()).toDTO();
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map(Job::toDTO).toList();
    }

    @Override
    public JobDTO getJob(String id) throws JobPortalException {
        return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
    }

    @Override
    public void applyJob(String id, ApplicantDTO applicantDTO) throws JobPortalException {
        Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant> applicants = job.getApplicants();
        if (applicants == null) applicants = new ArrayList<>();

        boolean alreadyApplied = applicants.stream()
                .anyMatch(a -> a.getApplicantId().equals(applicantDTO.getApplicantId()));
        if (alreadyApplied) throw new JobPortalException("JOB_APPLIED_ALREADY");

        applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
        applicants.add(applicantDTO.toEntity());
        job.setApplicants(applicants);
        jobRepository.save(job);
    }

    @Override
    public List<JobDTO> getJobsPostedBy(Long postedBy) {
        return jobRepository.findByPostedBy(postedBy).stream().map(Job::toDTO).toList();
    }

    @Override
    public void changeAppStatus(Application application) throws JobPortalException {
        Job job = jobRepository.findById(application.getId()).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
        List<Applicant> updatedApplicants = job.getApplicants().stream().map(applicant -> {
            if (application.getApplicantId().equals(applicant.getApplicantId())) {
                applicant.setApplicationStatus(application.getApplicationStatus());

                if (application.getApplicationStatus().equals(ApplicationStatus.INTERVIEWING)) {
                    applicant.setInterviewTime(application.getInterviewTime());

                    NotificationDTO notificationDto = new NotificationDTO();
                    notificationDto.setAction("Interview Scheduled");
                    notificationDto.setMessage("Interview Scheduled for job id: " + application.getApplicantId());
                    notificationDto.setUserId(application.getApplicantId());
                    notificationDto.setRoute("/jhistory");

                    try {
                        notificationService.sendNotification(notificationDto);
                    } catch (JobPortalException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
            return applicant;
        }).toList();

        job.setApplicants(updatedApplicants);
        jobRepository.save(job);
    }
}
