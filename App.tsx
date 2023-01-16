import { useState, useEffect } from "react";
import { IAPIData } from "./component/interface";
import "./App.css";
import Header from "./component/header/header";
import HomeTable from "./component/homeTable/homeTable";
import { BASE_URL } from "./helpers/requestHelper";

function App() {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tabledata, setTableData] = useState<IAPIData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    APIData();
  }, []);

  const APIData = async () => {
    setLoading(true);
    try {
      const data = await fetch(`${BASE_URL}/posts`);
      if (data.status === 200) {
        const result = await data.json();
        setTableData(result);
        setLoading(false);
      } else {
        setIsError(true);
        setTableData([]);
        setLoading(false);
      }
    } catch (error) {
      console.log(`Data is not coming ${error}`);
      setLoading(false);
    }
  };

  const handleShowModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    setIsNewRecord(isOpen);
  };

  const handleEditModal = (isEdit: any) => {
    setIsEdit(isEdit);
  };

  return (
    <div className="app-wrapper">
      <Header isOpen={handleShowModal} />
      {isError && (
        <div className="loader loader_color">API is not working...</div>
      )}
      {loading && <div className="loader">Data Loading...</div>}
      <HomeTable
        tabledata={tabledata}
        setTableData={setTableData}
        isModalOpen={isModalOpen}
        isOpen={handleShowModal}
        isEdit={isEdit}
        handleEditModal={handleEditModal}
        isNewRecord={isNewRecord}
      />
    </div>
  );
}

export default App;
