package de.upb.crc901.proseco.view.app.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.FileUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import de.upb.crc901.proseco.core.PROSECOConfig;
import de.upb.crc901.proseco.core.ProcessConfig;
import de.upb.crc901.proseco.core.composition.PROSECOProcessEnvironment;

public class DefaultProcessController implements ProcessController {

	private final File prosecoConfigFile;
	private final PROSECOConfig config;

	public DefaultProcessController(File prosecoConfigFile) {
		super();
		this.prosecoConfigFile = prosecoConfigFile;
		config = PROSECOConfig.get(prosecoConfigFile);
	}

	/**
	 * Creates a new PROSECO service construction process for a given prototype. The prototype skeleton is copied for the new process.
	 * 
	 * @return id The id for the newly created process
	 * @throws IOException
	 */
	public PROSECOProcessEnvironment createConstructionProcessEnvironment(String domainName) throws IOException {
		String id = domainName + "-" + UUID.randomUUID().toString().replace("-", "").substring(0, 10).toLowerCase();
		File processFolder = new File(config.getDirectoryForProcesses() + File.separator + id);
		FileUtils.forceMkdir(processFolder);
		ProcessConfig pc = new ProcessConfig(id, domainName, prosecoConfigFile);
		new ObjectMapper().writeValue(new File(processFolder + File.separator + "process.json"), pc);
		PROSECOProcessEnvironment env = new PROSECOProcessEnvironment(processFolder);
		return env;
	}

	public PROSECOProcessEnvironment getConstructionProcessEnvironment(String processId) {
		try {
			File processFolder = new File(config.getDirectoryForProcesses() + File.separator + processId);
			return new PROSECOProcessEnvironment(processFolder);
		} catch (Exception e) {
			throw new RuntimeException("Could not create an environment object for process id " + processId, e);
		}
	}

}
