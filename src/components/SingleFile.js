import axios from 'axios';

const SingleFile = ({fileName, id}) => {

    const downloadFile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${id}/${fileName}`, { responseType: 'blob' });

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();

      } 
      catch (error) {
        console.error(error);
      }
    };
    
    return (
        <div>
          <p>File name: {fileName}</p>
          <button onClick={() => downloadFile()}>Download</button>
        </div>
      );
}

export default SingleFile