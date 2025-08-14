package com.riyas.resumegenerator.resume;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.riyas.resumegenerator.Gemeni.GeminiClient;
import com.riyas.resumegenerator.Gemeni.ResumeData;
import com.riyas.resumegenerator.Jobs.JobClient;
import com.riyas.resumegenerator.Jobs.JobResponce;
import com.riyas.resumegenerator.Users.ProfileRequest;
import com.riyas.resumegenerator.minio.ImageService;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.JRException;

@Service
@RequiredArgsConstructor
public class ResumeService {

  public final ResumeRepository repository;
  public final JobClient jobClient;
  public final GeminiClient aiClient;
  public final GenerateResume resumegenerator;
  public final ImageService imageService;

  public String generate(ProfileRequest userProfile) {
    List<JobResponce> jobs = jobClient.getJobs();
    int i = 0;
    for (JobResponce jobResponce : jobs) {
      
      ResumeData data = aiClient.generateResume(userProfile, jobResponce);

      try {
        // Generate the PDF as a byte array
        byte[] pdfBytes = resumegenerator.generateResume(data);
        // Define a file name for the PDF
        String fileName = jobResponce.companyName().replace(" ", "_") + "_" + data.getRole().replace(" ", "_") + "_" + i++
            + ".pdf";
        // Upload the PDF to the bucket and get the public URL
        String resumeUrl = imageService.uploadPdf(pdfBytes, fileName);

        Resume resume = new Resume();
        resume.setResumeLink(resumeUrl);
        resume.setJobId(jobResponce.jobId());

        repository.save(resume);
        
        System.out.println("Generated and uploaded resume: " + resumeUrl);

      } catch (JRException e) {
        System.err.println("Failed to generate PDF: " + e.getMessage());
      }
    }
    return null;
  }

}
