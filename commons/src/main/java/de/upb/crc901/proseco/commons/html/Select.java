package de.upb.crc901.proseco.commons.html;

import java.util.List;
import java.util.Map;

/**
 * HTML Select element &lt;select\&gt;
 * 
 * @author kadirayk
 *
 */
public class Select extends UIElement {
	private List<Option> options;
	private static final String TAG = "select";

	public Select() {
		setTag(TAG);
	}

	public Select(String content, Map<String, String> attributes, List<Option> options) {
		setTag(TAG);
		setContent(content);
		setAttributes(attributes);
		setOptions(options);
	}

	public List<Option> getOptions() {
		return options;
	}

	public void setOptions(List<Option> options) {
		this.options = options;
	}

	@Override
	public String toHTML() {
		StringBuilder html = new StringBuilder("<");
		html.append(getTag());
		if (getAttributes() != null) {
			for (Map.Entry<String, String> entry : getAttributes().entrySet()) {
				if (entry.getKey().equals("name")) {
					entry.setValue("response");
				}
				html.append(" ").append(entry.getKey()).append("=\"").append(entry.getValue()).append("\"");
			}
		}
		html.append(">");
		if (options != null) {
			for (Option o : options) {
				html.append("\n\t").append(o.toHTML());
			}
		}
		html.append("\n</").append(getTag()).append(">");
		return html.toString();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((options == null) ? 0 : options.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (!super.equals(obj)) {
			return false;
		}
		Select mObj = (Select) obj;
		return options.equals(mObj.getOptions());
	}

}
