import React, { useEffect, useState } from 'react';
import './calendar.css';

const App = () => {
  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0=Dom, 1=Seg etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const isToday = currentDate.toDateString() === today.toDateString();

      weekDays.push({
        numero: currentDate.getDate(),
        nome: getDayName(currentDate.getDay()),
        isToday,
      });
    }
    return weekDays;
  };

  const getDayName = (dayIndex) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[dayIndex];
  };

  const dias = getCurrentWeekDays();

  const horas = Array.from({ length: 16 }, (_, i) => (5 + i).toString().padStart(2, '0'));

  const [linhaAtualTop, setLinhaAtualTop] = useState(null);

      useEffect(() => {
      const atualizarPosicao = () => {
        const agora = new Date();
        const hora = agora.getHours();
        const minuto = agora.getMinutes();

        if (hora >= 5 && hora <= 20) {
          const rowHeight = 60; 
          const horaIndex = hora - 5; 
          const top = horaIndex * rowHeight + (minuto / 60) * rowHeight;
          setLinhaAtualTop(top);
        } else {
          setLinhaAtualTop(null);
        }
      };

      atualizarPosicao();
      const intervalo = setInterval(atualizarPosicao, 60000);
      return () => clearInterval(intervalo);
    }, []);

  return (
    <div className="calendar-container">
      <table className="calendar-table">
        <thead>
          <tr className="header-row">
            <th className="hour-header"></th>
            {dias.map((dia) => (
              <th
                key={`header-${dia.numero}`}
                className={`day-header ${dia.isToday ? 'today' : ''}`}
              >
                <div className="day-number">{dia.numero}</div>
                <div className="day-name">{dia.nome}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {horas.map((hora, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="event-row">
              <td className="hour-cell">
                <span>{hora}:00</span>
              </td>
              {dias.map((dia) => (
                <td
                  key={`cell-${dia.numero}-${rowIndex}`}
                  className={`event-cell ${dia.isToday ? 'today-column' : ''}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {linhaAtualTop !== null && (
        <div className="linha-horario-atual" style={{ top: `${linhaAtualTop}px` }}></div>
      )}
    </div>
  );
};

export default App;
