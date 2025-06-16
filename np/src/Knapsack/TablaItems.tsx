import { Table, Button } from 'antd';

interface Item {
  peso: number;
  valor: number;
}

interface Props {
  items: Item[];
  removeItem: (index: number) => void;
}

const AllItems = ({ items, removeItem }: Props) => {
  // Agregar índice absoluto a los datos
  const dataSource = items.map((item, index) => ({
    ...item,
    key: index,
    index: index + 1, // índice visible, absoluto
  }));

  const columns = [
    {
      title: '#',
      dataIndex: 'index', // usar el índice directamente del dataSource
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
      title: 'Eficiencia',
      key: 'eficiencia',
      render: (_: any, record: Item) =>
        record.peso !== 0 ? (record.valor / record.peso).toFixed(2) : 'N/A',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, record: any) => (
        <Button type="link" danger onClick={() => removeItem(record.index - 1)}>
          Eliminar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="font-semibold">Items:</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default AllItems;
