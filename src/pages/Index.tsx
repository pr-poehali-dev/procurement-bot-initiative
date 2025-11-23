import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  category: string;
}

const Index = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: '1',
      name: 'ООО "Торговый Дом"',
      contact: 'Иванов Иван',
      email: 'ivanov@td.ru',
      phone: '+7 (495) 123-45-67',
      category: 'Оптовик',
    },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    category: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSupplier = () => {
    if (newSupplier.name && newSupplier.contact) {
      const supplier: Supplier = {
        id: Date.now().toString(),
        ...newSupplier,
      };
      setSuppliers([...suppliers, supplier]);
      setNewSupplier({ name: '', contact: '', email: '', phone: '', category: '' });
      setIsDialogOpen(false);
    }
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="ShoppingCart" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Управление закупками</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="suppliers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="suppliers">Поставщики</TabsTrigger>
            <TabsTrigger value="contacts">База контактов</TabsTrigger>
          </TabsList>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Icon
                  name="Search"
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Поиск поставщиков..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить поставщика
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый поставщик</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название компании</Label>
                      <Input
                        id="name"
                        value={newSupplier.name}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, name: e.target.value })
                        }
                        placeholder='ООО "Название"'
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Контактное лицо</Label>
                      <Input
                        id="contact"
                        value={newSupplier.contact}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, contact: e.target.value })
                        }
                        placeholder="Иванов Иван"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newSupplier.email}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, email: e.target.value })
                        }
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        value={newSupplier.phone}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, phone: e.target.value })
                        }
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Input
                        id="category"
                        value={newSupplier.category}
                        onChange={(e) =>
                          setNewSupplier({ ...newSupplier, category: e.target.value })
                        }
                        placeholder="Оптовик, Производитель..."
                      />
                    </div>
                    <Button onClick={handleAddSupplier} className="w-full">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {filteredSuppliers.length === 0 ? (
                <Card className="p-8 text-center">
                  <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Поставщики не найдены' : 'Добавьте первого поставщика'}
                  </p>
                </Card>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <Card key={supplier.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Icon name="User" size={16} className="text-muted-foreground" />
                            <span className="text-foreground">{supplier.contact}</span>
                          </div>
                          {supplier.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Mail" size={16} className="text-muted-foreground" />
                              <span className="text-foreground">{supplier.email}</span>
                            </div>
                          )}
                          {supplier.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Icon name="Phone" size={16} className="text-muted-foreground" />
                              <span className="text-foreground">{supplier.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <Card className="p-8 text-center">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Здесь будут отображаться все контакты из базы поставщиков
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;