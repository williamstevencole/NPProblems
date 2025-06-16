import { Table } from 'antd';

interface Item {
  peso: number;
  valor: number;
}

interface Props {
  data: Item[];
}

const ExcludedItemsTable = ({ data }: Props) => {
  // Agregar un índice absoluto (estable y único)
  const dataWithKeys = data.map((item, index) => ({
    ...item,
    key: index,
    index: index + 1, // índice absoluto (1-based)
  }));

  const columns = [
    {
      title: '#',
      dataIndex: 'index', // ahora se usa directamente
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
      render: (_: any, record: Item) =>
        record.peso !== 0 ? (record.valor / record.peso).toFixed(2) : 'N/A',
    },
  ];

  return (
    <div style={{
  background: 'linear-gradient(135deg,rgb(242, 247, 140),rgb(230, 246, 54))',
  padding: '2rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  borderRadius: '12px'
}}>
    <Table
      columns={columns}
      dataSource={dataWithKeys}
      pagination={{ pageSize: 5 }}
    />
    </div>
  );
};

export default ExcludedItemsTable;
