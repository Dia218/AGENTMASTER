package agentmaster.newstock.common.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;

@Convert
public class BooleanToYnConverter implements AttributeConverter<Boolean, String> {

    /**
     * Boolean 값을 Y or N으로 Convert
     *
     * @param attribute boolean 값
     * @return String true인 경우 Y / fasle인 경우 N
     */
    @Override
    public String convertToDatabaseColumn(Boolean attribute) {
        return (attribute != null && attribute) ? "Y" : "N";
    }

    /**
     * Y or N을 Boolean으로 Convert
     *
     * @param yn Y or N
     * @return Boolean 대소문자 상관없이 Y인 경우 true / N인 경우 false
     */
    @Override
    public Boolean convertToEntityAttribute(String yn) {
        return "Y".equalsIgnoreCase(yn);
    }
}
