export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      league_users_season: {
        Row: {
          league_id: string;
          role: Database["public"]["Enums"]["Role"];
          season_id: string;
          user_id: string;
        };
        Insert: {
          league_id: string;
          role: Database["public"]["Enums"]["Role"];
          season_id: string;
          user_id: string;
        };
        Update: {
          league_id?: string;
          role?: Database["public"]["Enums"]["Role"];
          season_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "league_users_season_league_id_fkey";
            columns: ["league_id"];
            isOneToOne: false;
            referencedRelation: "leagues";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "league_users_season_season_id_fkey";
            columns: ["season_id"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "league_users_season_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      leagues: {
        Row: {
          created_at: string | null;
          does_include_over_under: boolean;
          does_include_playoffs: boolean;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          does_include_over_under: boolean;
          does_include_playoffs: boolean;
          id: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          does_include_over_under?: boolean;
          does_include_playoffs?: boolean;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      nfl_matchups: {
        Row: {
          away_team: number;
          home_team: number;
          id: string;
          isComplete: boolean;
          odds: Json;
          over_under_number: number | null;
          over_under_winner: Database["public"]["Enums"]["Over Under"] | null;
          score: Json | null;
          season: string;
          time: string | null;
          week: number;
          winner: number | null;
        };
        Insert: {
          away_team: number;
          home_team: number;
          id: string;
          isComplete: boolean;
          odds: Json;
          over_under_number?: number | null;
          over_under_winner?: Database["public"]["Enums"]["Over Under"] | null;
          score?: Json | null;
          season: string;
          time?: string | null;
          week: number;
          winner?: number | null;
        };
        Update: {
          away_team?: number;
          home_team?: number;
          id?: string;
          isComplete?: boolean;
          odds?: Json;
          over_under_number?: number | null;
          over_under_winner?: Database["public"]["Enums"]["Over Under"] | null;
          score?: Json | null;
          season?: string;
          time?: string | null;
          week?: number;
          winner?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "nfl_matchups_away_team_fkey";
            columns: ["away_team"];
            isOneToOne: false;
            referencedRelation: "nfl_teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "nfl_matchups_home_team_fkey";
            columns: ["home_team"];
            isOneToOne: false;
            referencedRelation: "nfl_teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "nfl_matchups_season_fkey";
            columns: ["season"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "nfl_matchups_winner_fkey";
            columns: ["winner"];
            isOneToOne: false;
            referencedRelation: "nfl_teams";
            referencedColumns: ["id"];
          }
        ];
      };
      nfl_teams: {
        Row: {
          abbreviation: string | null;
          city: string | null;
          conference: Database["public"]["Enums"]["Conference"] | null;
          division: Database["public"]["Enums"]["Division"] | null;
          id: number;
          name: string;
        };
        Insert: {
          abbreviation?: string | null;
          city?: string | null;
          conference?: Database["public"]["Enums"]["Conference"] | null;
          division?: Database["public"]["Enums"]["Division"] | null;
          id: number;
          name: string;
        };
        Update: {
          abbreviation?: string | null;
          city?: string | null;
          conference?: Database["public"]["Enums"]["Conference"] | null;
          division?: Database["public"]["Enums"]["Division"] | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      picks: {
        Row: {
          created_at: string | null;
          id: string;
          league_id: string;
          matchup_id: string;
          over_under_selection: string | null;
          season_id: string;
          team_selection: number | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          league_id: string;
          matchup_id: string;
          over_under_selection?: string | null;
          season_id: string;
          team_selection?: number | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          league_id?: string;
          matchup_id?: string;
          over_under_selection?: string | null;
          season_id?: string;
          team_selection?: number | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "picks_league_id_fkey";
            columns: ["league_id"];
            isOneToOne: false;
            referencedRelation: "leagues";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "picks_matchup_id_fkey";
            columns: ["matchup_id"];
            isOneToOne: false;
            referencedRelation: "nfl_matchups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "picks_season_id_fkey";
            columns: ["season_id"];
            isOneToOne: false;
            referencedRelation: "seasons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "picks_team_selection_fkey";
            columns: ["team_selection"];
            isOneToOne: false;
            referencedRelation: "nfl_teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "picks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      seasons: {
        Row: {
          id: string;
          season_year: number;
        };
        Insert: {
          id: string;
          season_year: number;
        };
        Update: {
          id?: string;
          season_year?: number;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          favorite_team: string | null;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          favorite_team?: string | null;
          id: string;
          name: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          favorite_team?: string | null;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_league: {
        Args: {
          input_league_id: string;
          user_id: string;
          league_name: string;
          does_include_over_under: boolean;
          does_include_playoffs: boolean;
          input_season_year: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      Conference: "AFC" | "NFC";
      Division: "East" | "West" | "North" | "South";
      "Over Under": "Over" | "Under";
      Role: "Commissioner" | "Member";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
