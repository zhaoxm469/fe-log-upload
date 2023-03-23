import { Table, Button, Space, Pagination,DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { getLogApi } from "@/api/log";
import { Container } from "@/components/Container";
import { Link } from "react-router-dom";

const ListPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [timerRange, setTimerRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [columns] = useState([
    {
      title: '文件名',
      dataIndex: 'name',
      render: (text) => {
        return <Link to="/log/detail" state={{fileName:text}}>{text}</Link>
      },
    }
  ]);

  const fetchData = async () => {
    try {
      const [dateStart,dateEnd] = timerRange || []
      const { total,list } = await getLogApi({
        page: currentPage,
        size: pageSize,
        dateStart,
        dateEnd
      })
      setDataSource(list);
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize,timerRange ]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <Container>
      <Space className="flex justify-end pb-4">
        <DatePicker.RangePicker 
          onChange={(value) => setTimerRange(value)}
          placeholder={['开始时间', '结束时间']}
        />
        <Button onClick={handleSearch}>查询</Button>
      </Space>
      <Table dataSource={dataSource} pagination={false} columns={columns} rowKey="name" />
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
    </Container>
  );
};

export default ListPage;
