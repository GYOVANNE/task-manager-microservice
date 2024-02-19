import { AppError } from "@shared/errors/app-errors";

export function stringToMiliseconds(timeString: string) {
    const timeUnits = {
      s: 1, // seconds
      m: 60, // minutes (1 minute = 60 seconds)
      h: 3600, // hours (1 hour = 3600 seconds)
      d: 86400, // days (1 day = 86400 seconds)
    };
  
    const regex = /^(\d+)([smhd])$/;
  
    const match = timeString.match(regex);
    if (!match) {
      throw new AppError(
        "Formato de tempo inválido. Use o formato '1s', '1m', '1h' ou '1d'.",
        400,
      );
    }
  
    const amount = parseInt(match[1], 10);
    const unit = match[2];
  
    if (!timeUnits[unit]) {
      throw new AppError(
        `Unidade de tempo inválida: '${unit}'. Use 's', 'm', 'h' ou 'd'.`,
        400,
      );
    }
  
    return amount * (timeUnits[unit] * 1000);
  }
  