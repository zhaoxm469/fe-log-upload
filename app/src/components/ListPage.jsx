import { Table, Input, Button, Space, Pagination,DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { get } from "../api";

const { Column } = Table;

const ListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      const response = await get("/fe/log")
      console.log(response)
      // setDataSource(response.data.list);
      // setTotal(response.data.total);
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
        <DatePicker.RangePicker />
        <Input.Search
          placeholder="请输入关键字"
          allowClear
          enterButton={<SearchOutlined />}
          onSearch={(value) => setSearchText(value)}
        />
        <Button onClick={handleSearch}>查询</Button>
      </Space>
      <Table dataSource={dataSource} pagination={false}>
        <Column title="编号" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="年龄" dataIndex="age" key="age" />
        <Column title="地址" dataIndex="address" key="address" />
      </Table>
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
