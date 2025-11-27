import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CreateGroupProps {
  onClose: () => void;
  onCreate: (groupName: string, selectedContacts: number[]) => void;
}

const CreateGroup = ({ onClose, onCreate }: CreateGroupProps) => {
  const [step, setStep] = useState<'select' | 'details'>('select');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const allContacts = [
    { id: 1, name: 'Анна Иванова', phone: '+7 999 123-45-67', status: 'В сети' },
    { id: 2, name: 'Дмитрий Петров', phone: '+7 999 765-43-21', status: 'Был(а) час назад' },
    { id: 3, name: 'Мария Смирнова', phone: '+7 999 555-00-11', status: 'В сети' },
    { id: 4, name: 'Алексей Козлов', phone: '+7 999 444-22-33', status: 'Был(а) 2 часа назад' },
    { id: 5, name: 'Елена Волкова', phone: '+7 999 777-88-99', status: 'В сети' },
    { id: 6, name: 'Иван Соколов', phone: '+7 999 222-11-00', status: 'Был(а) 5 минут назад' },
    { id: 7, name: 'Ольга Новикова', phone: '+7 999 666-55-44', status: 'В сети' },
    { id: 8, name: 'Сергей Морозов', phone: '+7 999 333-99-88', status: 'Был(а) вчера' },
  ];

  const filteredContacts = allContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const toggleContact = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleNext = () => {
    if (selectedContacts.length > 0) {
      setStep('details');
    }
  };

  const handleCreate = () => {
    if (groupName.trim().length > 0) {
      onCreate(groupName, selectedContacts);
    }
  };

  const selectedContactsData = allContacts.filter(c => selectedContacts.includes(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="glass-effect rounded-3xl p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={step === 'details' ? () => setStep('select') : onClose}
                className="h-10 w-10 rounded-full hover:bg-white/10"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">
                  {step === 'select' ? 'Выбрать участников' : 'Детали группы'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {step === 'select' 
                    ? `Выбрано: ${selectedContacts.length} из 100` 
                    : 'Добавьте название и описание'
                  }
                </p>
              </div>
            </div>
            {step === 'select' && selectedContacts.length > 0 && (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 rounded-2xl neon-glow"
              >
                Далее
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            )}
          </div>

          {step === 'select' ? (
            <>
              <div className="relative mb-6">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск контактов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50"
                />
              </div>

              {selectedContacts.length > 0 && (
                <div className="mb-6 animate-fade-in">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                    Выбранные участники
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContactsData.map(contact => (
                      <Badge
                        key={contact.id}
                        className="bg-primary/20 text-primary border-primary/30 px-3 py-2 cursor-pointer hover:bg-primary/30"
                        onClick={() => toggleContact(contact.id)}
                      >
                        {contact.name}
                        <Icon name="X" size={14} className="ml-2" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {filteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => toggleContact(contact.id)}
                    className={`
                      glass-effect rounded-2xl p-4 cursor-pointer transition-all
                      ${selectedContacts.includes(contact.id) 
                        ? 'bg-primary/10 border-2 border-primary/50' 
                        : 'hover:bg-white/5'
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedContacts.includes(contact.id)}
                        onCheckedChange={() => toggleContact(contact.id)}
                        className="border-primary/50"
                      />
                      <Avatar className="h-12 w-12 border-2 border-primary/50">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative group cursor-pointer">
                  <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="Users" size={48} className="text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Camera" size={32} className="text-white" />
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl border-primary/50 hover:bg-primary/10">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить фото группы
                </Button>
              </div>

              <div className="space-y-3">
                <Label htmlFor="groupName" className="text-foreground">
                  Название группы <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="groupName"
                  type="text"
                  placeholder="Например: Рабочая группа"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="groupDescription" className="text-foreground">
                  Описание группы
                </Label>
                <Input
                  id="groupDescription"
                  type="text"
                  placeholder="О чём эта группа?"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
                />
              </div>

              <div className="glass-effect rounded-2xl p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Участники ({selectedContacts.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedContactsData.map(contact => (
                    <div key={contact.id} className="flex items-center gap-3 p-2">
                      <Avatar className="h-10 w-10 border-2 border-primary/50">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{contact.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCreate}
                disabled={groupName.trim().length === 0}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-30 rounded-2xl neon-glow"
              >
                <Icon name="Check" size={20} className="mr-2" />
                Создать группу
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
