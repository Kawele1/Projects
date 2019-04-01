export class Election {
  id: number;
  election_name: string;
  ward_id: number;
  ward_name: string;
  ward_consituency: string;
  constituency_id: number;
  constituency_name: string;
  province_id: number;
  province_name: string;
  candidate_id: number;
  candidate_name: string;
  PollingStationLocation: string;
  election_OpenTime: Date;
  election_CloseTime: Date;
  created_at: Date;
}