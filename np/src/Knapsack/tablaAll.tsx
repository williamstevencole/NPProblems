import { Table } from 'antd';

interface Item {
  peso: number;
  valor: number;
}

interface Props {
  data: Item[];
}

const IncludedItemsTable = ({ data }: Props) => {
  const columns = [
    {
      title: 'Peso',
      dataIndex: 'peso',
      key: 'peso',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
    {
      title: 'Eficiencia (valor/peso)',
      key: 'eficiencia',
      render: (_: any, record: Item) => {
        const eficiencia = record.peso !== 0 ? (record.valor / record.peso).toFixed(2) : 'N/A';
        return eficiencia;
      },
    },
  ];
  
  const dataWithKeys = data.map((item, index) => ({
    ...item,
    key: index,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataWithKeys}
      pagination={{ pageSize: 5 }}
    />
  );
};
export default IncludedItemsTable;