const window = Dimensions.get('window');
const placeholder = (window.width / 4) - (10 * 3);
import Dimensions from 'Dimensions';
export default {
   buttonContainerUpload: {
    backgroundColor: '#807fba',
    height: 50,
    justifyContent: 'center',
  },
  buttonContainerProcessingUpload: {
    backgroundColor: '#4e4e4e',
    height: 50,
    justifyContent: 'center',
  },
  buttonContainerCancel: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    height: 50,
    justifyContent: 'center',
  },
  inputContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 10,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    marginLeft: 3,
    width: window.width - 80 - 40,
  },
  inputLabel: {
    width: 80,
  },
  placeholder: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'dashed',
  },
  image: {
    width: placeholder,
    height: placeholder,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    justifyContent: 'flex-end',
    marginRight: 20,
    color: "#ccc",
  },
  row: {
      backgroundColor: '#ffffff',
      height: 45,
      paddingLeft: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: '#cccccc',
      alignItems: 'center',
      flexDirection: 'row',
  },
};
