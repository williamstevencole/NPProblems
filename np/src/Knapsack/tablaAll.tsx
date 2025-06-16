import { Table } from 'antd';

interface Item {
  peso: number;
  valor: number;
}

interface Props {
  data: Item[];
}

const IncludedItemsTable = ({ data }: Props) => {
  // Agrega el índice absoluto a cada item
  const dataWithIndex = data.map((item, index) => ({
    ...item,
    key: index,
    index: index + 1, // índice absoluto visible
  }));

  const columns = [
    {
      title: '#',
      dataIndex: 'index', // ahora se usa directamente desde el data
      key: 'index',
    },
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
        const eficiencia =
          record.peso !== 0 ? (record.valor / record.peso).toFixed(2) : 'N/A';
        return eficiencia;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataWithIndex}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default IncludedItemsTable;
