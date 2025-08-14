package com.riyas.resumegenerator.resume;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.HashMap;

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
        // Load the JRXML template from the resources folder
        InputStream templateStream = getClass().getResourceAsStream("/resume_template.jrxml");
        if (templateStream == null) {
            throw new RuntimeException("JasperReports template not found.");
        }

        // Compile the template
        JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

        // Create a data source from a list containing the single ResumeData object
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singletonList(data));

        // Fill the report with data
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<>(), dataSource);

        // Export the report to PDF and return as a byte array
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
