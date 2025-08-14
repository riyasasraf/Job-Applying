package com.riyas.resumegenerator.resume;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.riyas.resumegenerator.Gemeni.ResumeData;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
@Service
public class GenerateResume {

    public byte[] generateResume(ResumeData data) throws JRException {
        // Load JRXML template
        InputStream templateStream = getClass().getResourceAsStream("/resume_template.jrxml");
        if (templateStream == null) {
            throw new RuntimeException("JasperReports template not found.");
        }

        // Compile the template
        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        // Parameters for subreports or table components
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("resumeData", data); // in case you want direct access to fields

        // Nested collections
        parameters.put("educationDataSource", new JRBeanCollectionDataSource(data.getEducation()));
        parameters.put("experienceDataSource", new JRBeanCollectionDataSource(data.getExperienceAi()));
        parameters.put("projectDataSource", new JRBeanCollectionDataSource(data.getProjectAi()));
        parameters.put("skillsDataSource", new JRBeanCollectionDataSource(data.getSkills()));

        // Main datasource (single ResumeData object)
        JRBeanCollectionDataSource mainDataSource =
                new JRBeanCollectionDataSource(Collections.singletonList(data));

        // Fill the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, mainDataSource);

        // Export to PDF
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        JRPdfExporter exporter = new JRPdfExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
        exporter.setConfiguration(configuration);
        exporter.exportReport();

        return outputStream.toByteArray();
    }
}
