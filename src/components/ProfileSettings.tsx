import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProfileSettingsProps {
  onBack: () => void;
}

const ProfileSettings = ({ onBack }: ProfileSettingsProps) => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);

  const settingsSections = [
    {
      title: 'Уведомления',
      items: [
        { label: 'Уведомления', value: notifications, onChange: setNotifications },
        { label: 'Звук уведомлений', value: soundEnabled, onChange: setSoundEnabled },
      ],
    },
    {
      title: 'Конфиденциальность',
      items: [
        { label: 'Статус прочтения', value: readReceipts, onChange: setReadReceipts },
      ],
    },
    {
      title: 'Данные',
      items: [
        { label: 'Автозагрузка медиа', value: autoDownload, onChange: setAutoDownload },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="glass-effect rounded-3xl p-6 mb-6 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={onBack}
              className="h-10 w-10 rounded-full hover:bg-white/10"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Настройки и профиль</h1>
          </div>

          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative group cursor-pointer">
              <Avatar className="h-32 w-32 border-4 border-primary/50">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl">
                  ВЫ
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Icon name="Camera" size={32} className="text-white" />
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-primary/50 hover:bg-primary/10">
              <Icon name="Upload" size={16} className="mr-2" />
              Загрузить фото
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-foreground">Имя</Label>
              <Input
                id="name"
                type="text"
                defaultValue="Ваше имя"
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="bio" className="text-foreground">О себе</Label>
              <Input
                id="bio"
                type="text"
                defaultValue="Доступен для звонков"
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-foreground">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+7 999 123-45-67"
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="username" className="text-foreground">Имя пользователя</Label>
              <Input
                id="username"
                type="text"
                defaultValue="@username"
                className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
              />
            </div>
          </div>
        </div>

        {settingsSections.map((section, index) => (
          <div key={index} className="glass-effect rounded-3xl p-6 mb-6 animate-fade-in">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Settings" size={24} className="text-primary" />
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <div className="flex items-center justify-between py-3">
                    <Label htmlFor={`setting-${index}-${itemIndex}`} className="text-foreground cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch
                      id={`setting-${index}-${itemIndex}`}
                      checked={item.value}
                      onCheckedChange={item.onChange}
                    />
                  </div>
                  {itemIndex < section.items.length - 1 && <Separator className="bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="glass-effect rounded-3xl p-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Shield" size={24} className="text-primary" />
            Безопасность
          </h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-white/10 hover:bg-white/5">
              <Icon name="Lock" size={18} className="mr-3" />
              Изменить пароль
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-white/10 hover:bg-white/5">
              <Icon name="Smartphone" size={18} className="mr-3" />
              Двухфакторная аутентификация
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-white/10 hover:bg-white/5">
              <Icon name="UserX" size={18} className="mr-3" />
              Заблокированные пользователи
            </Button>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 mt-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Info" size={24} className="text-primary" />
            О приложении
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Версия</span>
              <span className="text-foreground font-medium">1.0.0</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between">
              <span>Последнее обновление</span>
              <span className="text-foreground font-medium">27.11.2025</span>
            </div>
            <Separator className="bg-white/10" />
            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-white/10 hover:bg-white/5 mt-4">
              <Icon name="HelpCircle" size={18} className="mr-3" />
              Справка и поддержка
            </Button>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full mt-6 h-12 rounded-2xl glass-effect hover:bg-red-500/20 border border-red-500/50 animate-fade-in"
        >
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
