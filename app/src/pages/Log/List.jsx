import { Table, Button, Space, Pagination,DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { getLogApi } from "@/api/log";

const ListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [columns, setColumns] = useState([
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      render: (text) => {
        return <a onClick={()=>alert(2)}>{text}</a>
      },
    }
  ]);

  const fetchData = async () => {
    try {
      const { total,list } = await getLogApi()
      setDataSource(list);
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchText]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Space className="flex justify-end pb-4">
        <DatePicker.RangePicker 
          onSearch={(value) => setSearchText(value)}
          placeholder={['开始时间', '结束时间']}
        />
        <Button onClick={handleSearch}>查询</Button>
      </Space>
      <Table dataSource={dataSource} pagination={false} columns={columns} />
      <div className="pt-4 justify-end flex">
        <Pagination
          total={total}
          current={currentPage}
          pageSize={pageSize}
          showSizeChanger
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ListPage;
