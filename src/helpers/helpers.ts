export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function getMatchupWeeks(season_year: number) {
  const matchupWeeks = [];
  for (let i = 1; i <= 18; i++) {
    let matchupWeek = { week: i, season: season_year };
    matchupWeeks.push(matchupWeek);
  }

  return matchupWeeks;
}
