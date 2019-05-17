package de.upb.crc901.proseco.commons.util.test;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import de.upb.crc901.proseco.commons.util.ListUtil;

public class ListUtilTest {

	@Test
	public void TestNull() {
		// null
		List<String> list = null;
		assertFalse(ListUtil.isNotEmpty(list));
	}

	@Test
	public void TestEmpty() {
		// not null but empty
		List<String> list = new ArrayList<>();
		assertFalse(ListUtil.isNotEmpty(list));
	}

	@Test
	public void TestNotEmpty() {
		// not empty
		List<String> list = new ArrayList<>();
		list.add("asd");
		assertTrue(ListUtil.isNotEmpty(list));
	}

}
