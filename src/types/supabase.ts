export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activity_interactions: {
        Row: {
          activity_id: string
          comment_text: string | null
          created_at: string | null
          id: string
          interaction_type: string
          share_platform: string | null
          user_id: string
        }
        Insert: {
          activity_id: string
          comment_text?: string | null
          created_at?: string | null
          id?: string
          interaction_type: string
          share_platform?: string | null
          user_id: string
        }
        Update: {
          activity_id?: string
          comment_text?: string | null
          created_at?: string | null
          id?: string
          interaction_type?: string
          share_platform?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_interactions_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "user_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          badges_earned: string[] | null
          challenge_id: string
          completed_at: string | null
          completion_percentage: number | null
          final_score: number | null
          id: string
          is_featured_submission: boolean | null
          is_winner: boolean | null
          joined_at: string | null
          progress_data: Json | null
          ranking: number | null
          status: string | null
          submission_notes: string | null
          submission_photos: string[] | null
          submission_recipe_id: string | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          badges_earned?: string[] | null
          challenge_id: string
          completed_at?: string | null
          completion_percentage?: number | null
          final_score?: number | null
          id?: string
          is_featured_submission?: boolean | null
          is_winner?: boolean | null
          joined_at?: string | null
          progress_data?: Json | null
          ranking?: number | null
          status?: string | null
          submission_notes?: string | null
          submission_photos?: string[] | null
          submission_recipe_id?: string | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          badges_earned?: string[] | null
          challenge_id?: string
          completed_at?: string | null
          completion_percentage?: number | null
          final_score?: number | null
          id?: string
          is_featured_submission?: boolean | null
          is_winner?: boolean | null
          joined_at?: string | null
          progress_data?: Json | null
          ranking?: number | null
          status?: string | null
          submission_notes?: string | null
          submission_photos?: string[] | null
          submission_recipe_id?: string | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "group_challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_submission_recipe_id_fkey"
            columns: ["submission_recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_recipes: {
        Row: {
          added_at: string | null
          added_by_user_id: string | null
          collection_id: string
          custom_ingredients: Json | null
          custom_modifications: string | null
          id: string
          last_cooked_date: string | null
          meal_type: string | null
          personal_notes: string | null
          personal_rating: number | null
          planned_date: string | null
          planned_servings: number | null
          recipe_id: string
          sort_order: number | null
          status: string | null
          times_cooked_from_collection: number | null
          updated_at: string | null
        }
        Insert: {
          added_at?: string | null
          added_by_user_id?: string | null
          collection_id: string
          custom_ingredients?: Json | null
          custom_modifications?: string | null
          id?: string
          last_cooked_date?: string | null
          meal_type?: string | null
          personal_notes?: string | null
          personal_rating?: number | null
          planned_date?: string | null
          planned_servings?: number | null
          recipe_id: string
          sort_order?: number | null
          status?: string | null
          times_cooked_from_collection?: number | null
          updated_at?: string | null
        }
        Update: {
          added_at?: string | null
          added_by_user_id?: string | null
          collection_id?: string
          custom_ingredients?: Json | null
          custom_modifications?: string | null
          id?: string
          last_cooked_date?: string | null
          meal_type?: string | null
          personal_notes?: string | null
          personal_rating?: number | null
          planned_date?: string | null
          planned_servings?: number | null
          recipe_id?: string
          sort_order?: number | null
          status?: string | null
          times_cooked_from_collection?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_recipes_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "recipe_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_shopping_lists: {
        Row: {
          collection_id: string
          completed_at: string | null
          completion_percentage: number | null
          created_at: string | null
          currency: string | null
          date_range_end: string | null
          date_range_start: string | null
          description: string | null
          estimated_cost: number | null
          id: string
          is_auto_generated: boolean | null
          name: string
          recipe_ids: string[] | null
          status: string | null
          store_sections: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          collection_id: string
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string | null
          currency?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_auto_generated?: boolean | null
          name: string
          recipe_ids?: string[] | null
          status?: string | null
          store_sections?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          collection_id?: string
          completed_at?: string | null
          completion_percentage?: number | null
          created_at?: string | null
          currency?: string | null
          date_range_end?: string | null
          date_range_start?: string | null
          description?: string | null
          estimated_cost?: number | null
          id?: string
          is_auto_generated?: boolean | null
          name?: string
          recipe_ids?: string[] | null
          status?: string | null
          store_sections?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_shopping_lists_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "recipe_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      cooking_attempts: {
        Row: {
          attempt_number: number
          completed_at: string | null
          created_at: string | null
          difficulty_experienced: number | null
          id: string
          modifications_made: string | null
          notes: string | null
          problems_encountered: string | null
          process_photo_urls: string[] | null
          recipe_id: string
          result_photo_urls: string[] | null
          servings_made: number | null
          shared_platforms: string[] | null
          shared_result: boolean | null
          started_at: string | null
          status: string | null
          substitutions_used: Json | null
          success_level: number | null
          time_taken_vs_expected: string | null
          total_cooking_time_minutes: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attempt_number?: number
          completed_at?: string | null
          created_at?: string | null
          difficulty_experienced?: number | null
          id?: string
          modifications_made?: string | null
          notes?: string | null
          problems_encountered?: string | null
          process_photo_urls?: string[] | null
          recipe_id: string
          result_photo_urls?: string[] | null
          servings_made?: number | null
          shared_platforms?: string[] | null
          shared_result?: boolean | null
          started_at?: string | null
          status?: string | null
          substitutions_used?: Json | null
          success_level?: number | null
          time_taken_vs_expected?: string | null
          total_cooking_time_minutes?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attempt_number?: number
          completed_at?: string | null
          created_at?: string | null
          difficulty_experienced?: number | null
          id?: string
          modifications_made?: string | null
          notes?: string | null
          problems_encountered?: string | null
          process_photo_urls?: string[] | null
          recipe_id?: string
          result_photo_urls?: string[] | null
          servings_made?: number | null
          shared_platforms?: string[] | null
          shared_result?: boolean | null
          started_at?: string | null
          status?: string | null
          substitutions_used?: Json | null
          success_level?: number | null
          time_taken_vs_expected?: string | null
          total_cooking_time_minutes?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooking_attempts_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      cooking_timers: {
        Row: {
          completed_at: string | null
          created_at: string | null
          duration_seconds: number
          id: string
          notification_sent: boolean | null
          paused_at: string | null
          recipe_id: string
          remaining_seconds: number
          sound_enabled: boolean | null
          started_at: string | null
          status: string | null
          step_id: string | null
          timer_name: string
          timer_type: string | null
          updated_at: string | null
          user_id: string
          vibration_enabled: boolean | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          duration_seconds: number
          id?: string
          notification_sent?: boolean | null
          paused_at?: string | null
          recipe_id: string
          remaining_seconds: number
          sound_enabled?: boolean | null
          started_at?: string | null
          status?: string | null
          step_id?: string | null
          timer_name: string
          timer_type?: string | null
          updated_at?: string | null
          user_id: string
          vibration_enabled?: boolean | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          duration_seconds?: number
          id?: string
          notification_sent?: boolean | null
          paused_at?: string | null
          recipe_id?: string
          remaining_seconds?: number
          sound_enabled?: boolean | null
          started_at?: string | null
          status?: string | null
          step_id?: string | null
          timer_name?: string
          timer_type?: string | null
          updated_at?: string | null
          user_id?: string
          vibration_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "cooking_timers_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cooking_timers_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "recipe_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      filter_tags: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          translations: Json | null
          updated_at: string | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          translations?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          translations?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "filter_tags_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "filter_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      group_challenges: {
        Row: {
          challenge_type: string
          completion_count: number | null
          created_at: string | null
          creator_id: string
          description: string
          difficulty_level: string | null
          end_date: string
          group_id: string
          id: string
          is_featured: boolean | null
          max_participants: number | null
          participant_count: number | null
          registration_deadline: string | null
          requirements: Json | null
          rewards: Json | null
          rules: string | null
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          challenge_type: string
          completion_count?: number | null
          created_at?: string | null
          creator_id: string
          description: string
          difficulty_level?: string | null
          end_date: string
          group_id: string
          id?: string
          is_featured?: boolean | null
          max_participants?: number | null
          participant_count?: number | null
          registration_deadline?: string | null
          requirements?: Json | null
          rewards?: Json | null
          rules?: string | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          challenge_type?: string
          completion_count?: number | null
          created_at?: string | null
          creator_id?: string
          description?: string
          difficulty_level?: string | null
          end_date?: string
          group_id?: string
          id?: string
          is_featured?: boolean | null
          max_participants?: number | null
          participant_count?: number | null
          registration_deadline?: string | null
          requirements?: Json | null
          rewards?: Json | null
          rules?: string | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_challenges_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "user_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_invitations: {
        Row: {
          expires_at: string | null
          group_id: string
          id: string
          invitation_message: string | null
          invitee_email: string | null
          invitee_id: string | null
          inviter_id: string
          responded_at: string | null
          sent_at: string | null
          status: string | null
          suggested_role: string | null
        }
        Insert: {
          expires_at?: string | null
          group_id: string
          id?: string
          invitation_message?: string | null
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id: string
          responded_at?: string | null
          sent_at?: string | null
          status?: string | null
          suggested_role?: string | null
        }
        Update: {
          expires_at?: string | null
          group_id?: string
          id?: string
          invitation_message?: string | null
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id?: string
          responded_at?: string | null
          sent_at?: string | null
          status?: string | null
          suggested_role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_invitations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "user_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_memberships: {
        Row: {
          bio: string | null
          challenges_completed: number | null
          group_id: string
          helpfulness_score: number | null
          id: string
          invited_at: string | null
          invited_by_user_id: string | null
          is_active: boolean | null
          is_featured_member: boolean | null
          joined_at: string | null
          last_active_at: string | null
          nickname: string | null
          notify_challenges: boolean | null
          notify_events: boolean | null
          notify_mentions: boolean | null
          notify_new_recipes: boolean | null
          recipes_shared_count: number | null
          role: string | null
          specialties: string[] | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          challenges_completed?: number | null
          group_id: string
          helpfulness_score?: number | null
          id?: string
          invited_at?: string | null
          invited_by_user_id?: string | null
          is_active?: boolean | null
          is_featured_member?: boolean | null
          joined_at?: string | null
          last_active_at?: string | null
          nickname?: string | null
          notify_challenges?: boolean | null
          notify_events?: boolean | null
          notify_mentions?: boolean | null
          notify_new_recipes?: boolean | null
          recipes_shared_count?: number | null
          role?: string | null
          specialties?: string[] | null
          user_id: string
        }
        Update: {
          bio?: string | null
          challenges_completed?: number | null
          group_id?: string
          helpfulness_score?: number | null
          id?: string
          invited_at?: string | null
          invited_by_user_id?: string | null
          is_active?: boolean | null
          is_featured_member?: boolean | null
          joined_at?: string | null
          last_active_at?: string | null
          nickname?: string | null
          notify_challenges?: boolean | null
          notify_events?: boolean | null
          notify_mentions?: boolean | null
          notify_new_recipes?: boolean | null
          recipes_shared_count?: number | null
          role?: string | null
          specialties?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_memberships_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "user_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_catalog: {
        Row: {
          allergens: string[] | null
          category: string
          common_names: string[] | null
          common_units: Json | null
          created_at: string | null
          default_unit: string | null
          dietary_flags: string[] | null
          id: string
          last_used_at: string | null
          name: string
          nutrition_per_100g: Json | null
          shelf_life_days: number | null
          storage_method: string | null
          translations: Json | null
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          allergens?: string[] | null
          category: string
          common_names?: string[] | null
          common_units?: Json | null
          created_at?: string | null
          default_unit?: string | null
          dietary_flags?: string[] | null
          id?: string
          last_used_at?: string | null
          name: string
          nutrition_per_100g?: Json | null
          shelf_life_days?: number | null
          storage_method?: string | null
          translations?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          allergens?: string[] | null
          category?: string
          common_names?: string[] | null
          common_units?: Json | null
          created_at?: string | null
          default_unit?: string | null
          dietary_flags?: string[] | null
          id?: string
          last_used_at?: string | null
          name?: string
          nutrition_per_100g?: Json | null
          shelf_life_days?: number | null
          storage_method?: string | null
          translations?: Json | null
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          challenges: Json | null
          cooking_reminders: Json | null
          created_at: string | null
          daily_digest_enabled: boolean | null
          digest_delivery_time: string | null
          email_notifications_enabled: boolean | null
          friend_requests: Json | null
          group_activities: Json | null
          id: string
          in_app_notifications_enabled: boolean | null
          push_notifications_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          recipe_interactions: Json | null
          system_announcements: Json | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          weekly_digest_enabled: boolean | null
        }
        Insert: {
          challenges?: Json | null
          cooking_reminders?: Json | null
          created_at?: string | null
          daily_digest_enabled?: boolean | null
          digest_delivery_time?: string | null
          email_notifications_enabled?: boolean | null
          friend_requests?: Json | null
          group_activities?: Json | null
          id?: string
          in_app_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          recipe_interactions?: Json | null
          system_announcements?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          weekly_digest_enabled?: boolean | null
        }
        Update: {
          challenges?: Json | null
          cooking_reminders?: Json | null
          created_at?: string | null
          daily_digest_enabled?: boolean | null
          digest_delivery_time?: string | null
          email_notifications_enabled?: boolean | null
          friend_requests?: Json | null
          group_activities?: Json | null
          id?: string
          in_app_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          recipe_interactions?: Json | null
          system_announcements?: Json | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          weekly_digest_enabled?: boolean | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          delivered_at: string | null
          delivered_via: string[] | null
          expires_at: string | null
          group_count: number | null
          group_key: string | null
          id: string
          image_url: string | null
          is_delivered: boolean | null
          is_grouped: boolean | null
          is_read: boolean | null
          message: string
          notification_type: string
          priority: string | null
          read_at: string | null
          recipient_id: string
          related_collection_id: string | null
          related_group_id: string | null
          related_recipe_id: string | null
          related_user_id: string | null
          scheduled_for: string | null
          sender_id: string | null
          title: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          delivered_at?: string | null
          delivered_via?: string[] | null
          expires_at?: string | null
          group_count?: number | null
          group_key?: string | null
          id?: string
          image_url?: string | null
          is_delivered?: boolean | null
          is_grouped?: boolean | null
          is_read?: boolean | null
          message: string
          notification_type: string
          priority?: string | null
          read_at?: string | null
          recipient_id: string
          related_collection_id?: string | null
          related_group_id?: string | null
          related_recipe_id?: string | null
          related_user_id?: string | null
          scheduled_for?: string | null
          sender_id?: string | null
          title: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          delivered_at?: string | null
          delivered_via?: string[] | null
          expires_at?: string | null
          group_count?: number | null
          group_key?: string | null
          id?: string
          image_url?: string | null
          is_delivered?: boolean | null
          is_grouped?: boolean | null
          is_read?: boolean | null
          message?: string
          notification_type?: string
          priority?: string | null
          read_at?: string | null
          recipient_id?: string
          related_collection_id?: string | null
          related_group_id?: string | null
          related_recipe_id?: string | null
          related_user_id?: string | null
          scheduled_for?: string | null
          sender_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_collection_id_fkey"
            columns: ["related_collection_id"]
            isOneToOne: false
            referencedRelation: "recipe_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_group_id_fkey"
            columns: ["related_group_id"]
            isOneToOne: false
            referencedRelation: "user_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_recipe_id_fkey"
            columns: ["related_recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allergens: string[] | null
          avatar_url: string | null
          bio: string | null
          cooking_level: string | null
          created_at: string | null
          dietary_restrictions: string[] | null
          display_name: string | null
          favorite_cuisines: string[] | null
          id: string
          is_verified: boolean | null
          location: string | null
          privacy_settings: Json | null
          terms_accepted: boolean
          terms_accepted_at: string | null
          terms_version: string | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          allergens?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          cooking_level?: string | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          display_name?: string | null
          favorite_cuisines?: string[] | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          privacy_settings?: Json | null
          terms_accepted?: boolean
          terms_accepted_at?: string | null
          terms_version?: string | null
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          allergens?: string[] | null
          avatar_url?: string | null
          bio?: string | null
          cooking_level?: string | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          display_name?: string | null
          favorite_cuisines?: string[] | null
          id?: string
          is_verified?: boolean | null
          location?: string | null
          privacy_settings?: Json | null
          terms_accepted?: boolean
          terms_accepted_at?: string | null
          terms_version?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      recipe_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          parent_id: string | null
          recipe_count: number | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          parent_id?: string | null
          recipe_count?: number | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          parent_id?: string | null
          recipe_count?: number | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "recipe_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_collections: {
        Row: {
          auto_generate_shopping_list: boolean | null
          average_rating: number | null
          collaborators: string[] | null
          collection_type: string | null
          color_theme: string | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_collaborative: boolean | null
          is_featured: boolean | null
          is_meal_plan: boolean | null
          last_recipe_added_at: string | null
          meal_plan_end_date: string | null
          meal_plan_settings: Json | null
          meal_plan_start_date: string | null
          name: string
          owner_id: string
          recipe_count: number | null
          send_meal_reminders: boolean | null
          slug: string
          sort_method: string | null
          tags: string[] | null
          total_cook_time_minutes: number | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          auto_generate_shopping_list?: boolean | null
          average_rating?: number | null
          collaborators?: string[] | null
          collection_type?: string | null
          color_theme?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_collaborative?: boolean | null
          is_featured?: boolean | null
          is_meal_plan?: boolean | null
          last_recipe_added_at?: string | null
          meal_plan_end_date?: string | null
          meal_plan_settings?: Json | null
          meal_plan_start_date?: string | null
          name: string
          owner_id: string
          recipe_count?: number | null
          send_meal_reminders?: boolean | null
          slug: string
          sort_method?: string | null
          tags?: string[] | null
          total_cook_time_minutes?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          auto_generate_shopping_list?: boolean | null
          average_rating?: number | null
          collaborators?: string[] | null
          collection_type?: string | null
          color_theme?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_collaborative?: boolean | null
          is_featured?: boolean | null
          is_meal_plan?: boolean | null
          last_recipe_added_at?: string | null
          meal_plan_end_date?: string | null
          meal_plan_settings?: Json | null
          meal_plan_start_date?: string | null
          name?: string
          owner_id?: string
          recipe_count?: number | null
          send_meal_reminders?: boolean | null
          slug?: string
          sort_method?: string | null
          tags?: string[] | null
          total_cook_time_minutes?: number | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          alternatives: Json | null
          amount: number | null
          calories_per_unit: number | null
          created_at: string | null
          id: string
          ingredient_group: string | null
          ingredient_type: string | null
          is_garnish: boolean | null
          is_optional: boolean | null
          name: string
          notes: string | null
          nutrition_per_unit: Json | null
          preparation: string | null
          recipe_id: string
          seasonality: string[] | null
          sort_order: number | null
          storage_tips: string | null
          substitution_ratio: number | null
          typical_cost_range: Json | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          alternatives?: Json | null
          amount?: number | null
          calories_per_unit?: number | null
          created_at?: string | null
          id?: string
          ingredient_group?: string | null
          ingredient_type?: string | null
          is_garnish?: boolean | null
          is_optional?: boolean | null
          name: string
          notes?: string | null
          nutrition_per_unit?: Json | null
          preparation?: string | null
          recipe_id: string
          seasonality?: string[] | null
          sort_order?: number | null
          storage_tips?: string | null
          substitution_ratio?: number | null
          typical_cost_range?: Json | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          alternatives?: Json | null
          amount?: number | null
          calories_per_unit?: number | null
          created_at?: string | null
          id?: string
          ingredient_group?: string | null
          ingredient_type?: string | null
          is_garnish?: boolean | null
          is_optional?: boolean | null
          name?: string
          notes?: string | null
          nutrition_per_unit?: Json | null
          preparation?: string | null
          recipe_id?: string
          seasonality?: string[] | null
          sort_order?: number | null
          storage_tips?: string | null
          substitution_ratio?: number | null
          typical_cost_range?: Json | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_interactions: {
        Row: {
          comment_text: string | null
          created_at: string | null
          device_type: string | null
          id: string
          interaction_type: string
          made_notes: string | null
          made_photo_url: string | null
          made_rating: number | null
          rating: number | null
          recipe_id: string
          session_id: string | null
          share_platform: string | null
          source: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment_text?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          interaction_type: string
          made_notes?: string | null
          made_photo_url?: string | null
          made_rating?: number | null
          rating?: number | null
          recipe_id: string
          session_id?: string | null
          share_platform?: string | null
          source?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment_text?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          interaction_type?: string
          made_notes?: string | null
          made_photo_url?: string | null
          made_rating?: number | null
          rating?: number | null
          recipe_id?: string
          session_id?: string | null
          share_platform?: string | null
          source?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_interactions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ratings: {
        Row: {
          cons: string[] | null
          created_at: string | null
          difficulty_rating: number | null
          helpful_votes: number | null
          id: string
          interaction_id: string | null
          is_featured: boolean | null
          is_moderated: boolean | null
          is_verified_purchase: boolean | null
          modifications_made: string | null
          overall_rating: number
          pros: string[] | null
          recipe_id: string
          review_text: string | null
          review_title: string | null
          taste_rating: number | null
          time_accuracy_rating: number | null
          total_votes: number | null
          updated_at: string | null
          user_id: string
          would_make_again: boolean | null
          would_recommend: boolean | null
        }
        Insert: {
          cons?: string[] | null
          created_at?: string | null
          difficulty_rating?: number | null
          helpful_votes?: number | null
          id?: string
          interaction_id?: string | null
          is_featured?: boolean | null
          is_moderated?: boolean | null
          is_verified_purchase?: boolean | null
          modifications_made?: string | null
          overall_rating: number
          pros?: string[] | null
          recipe_id: string
          review_text?: string | null
          review_title?: string | null
          taste_rating?: number | null
          time_accuracy_rating?: number | null
          total_votes?: number | null
          updated_at?: string | null
          user_id: string
          would_make_again?: boolean | null
          would_recommend?: boolean | null
        }
        Update: {
          cons?: string[] | null
          created_at?: string | null
          difficulty_rating?: number | null
          helpful_votes?: number | null
          id?: string
          interaction_id?: string | null
          is_featured?: boolean | null
          is_moderated?: boolean | null
          is_verified_purchase?: boolean | null
          modifications_made?: string | null
          overall_rating?: number
          pros?: string[] | null
          recipe_id?: string
          review_text?: string | null
          review_title?: string | null
          taste_rating?: number | null
          time_accuracy_rating?: number | null
          total_votes?: number | null
          updated_at?: string | null
          user_id?: string
          would_make_again?: boolean | null
          would_recommend?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ratings_interaction_id_fkey"
            columns: ["interaction_id"]
            isOneToOne: false
            referencedRelation: "recipe_interactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ratings_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_shares: {
        Row: {
          clicks_count: number | null
          conversions_count: number | null
          created_at: string | null
          custom_message: string | null
          id: string
          included_modifications: boolean | null
          included_photos: boolean | null
          platform: string | null
          recipe_id: string
          recipient_info: Json | null
          share_method: string
          share_token: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string | null
          custom_message?: string | null
          id?: string
          included_modifications?: boolean | null
          included_photos?: boolean | null
          platform?: string | null
          recipe_id: string
          recipient_info?: Json | null
          share_method: string
          share_token?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          clicks_count?: number | null
          conversions_count?: number | null
          created_at?: string | null
          custom_message?: string | null
          id?: string
          included_modifications?: boolean | null
          included_photos?: boolean | null
          platform?: string | null
          recipe_id?: string
          recipient_info?: Json | null
          share_method?: string
          share_token?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_shares_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_steps: {
        Row: {
          cook_time_minutes: number | null
          cooking_method: string | null
          created_at: string | null
          difficulty_level: string | null
          duration_minutes: number | null
          equipment_needed: string[] | null
          has_timer: boolean | null
          id: string
          image_alt_text: string | null
          image_url: string | null
          ingredients_used: string[] | null
          instruction: string
          is_critical: boolean | null
          is_optional: boolean | null
          oven_setting: string | null
          prep_time_minutes: number | null
          recipe_id: string
          sort_order: number | null
          step_group: string | null
          step_number: number
          success_indicators: string | null
          temperature_celsius: number | null
          temperature_fahrenheit: number | null
          timer_sound: string | null
          timer_type: string | null
          tips: string | null
          title: string | null
          troubleshooting: string | null
          updated_at: string | null
          video_url: string | null
          wait_time_minutes: number | null
        }
        Insert: {
          cook_time_minutes?: number | null
          cooking_method?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          equipment_needed?: string[] | null
          has_timer?: boolean | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          ingredients_used?: string[] | null
          instruction: string
          is_critical?: boolean | null
          is_optional?: boolean | null
          oven_setting?: string | null
          prep_time_minutes?: number | null
          recipe_id: string
          sort_order?: number | null
          step_group?: string | null
          step_number: number
          success_indicators?: string | null
          temperature_celsius?: number | null
          temperature_fahrenheit?: number | null
          timer_sound?: string | null
          timer_type?: string | null
          tips?: string | null
          title?: string | null
          troubleshooting?: string | null
          updated_at?: string | null
          video_url?: string | null
          wait_time_minutes?: number | null
        }
        Update: {
          cook_time_minutes?: number | null
          cooking_method?: string | null
          created_at?: string | null
          difficulty_level?: string | null
          duration_minutes?: number | null
          equipment_needed?: string[] | null
          has_timer?: boolean | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          ingredients_used?: string[] | null
          instruction?: string
          is_critical?: boolean | null
          is_optional?: boolean | null
          oven_setting?: string | null
          prep_time_minutes?: number | null
          recipe_id?: string
          sort_order?: number | null
          step_group?: string | null
          step_number?: number
          success_indicators?: string | null
          temperature_celsius?: number | null
          temperature_fahrenheit?: number | null
          timer_sound?: string | null
          timer_type?: string | null
          tips?: string | null
          title?: string | null
          troubleshooting?: string | null
          updated_at?: string | null
          video_url?: string | null
          wait_time_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_steps_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          author_id: string
          average_rating: number | null
          category_id: string | null
          co_authors: string[] | null
          cook_time_minutes: number | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          equipment_needed: string[] | null
          filter_tag_ids: string[] | null
          id: string
          image_alt_text: string | null
          image_url: string | null
          ingredients_note: string | null
          is_featured: boolean | null
          is_latest_version: boolean | null
          last_made_at: string | null
          like_count: number | null
          made_count: number | null
          nutrition_data: Json | null
          original_servings: number | null
          parent_recipe_id: string | null
          prep_time_minutes: number | null
          published_at: string | null
          rating_count: number | null
          save_count: number | null
          scaling_notes: string | null
          servings: number | null
          slug: string
          source_attribution: string | null
          source_type: string | null
          source_url: string | null
          status: string | null
          tips_and_notes: string | null
          title: string
          total_time_minutes: number | null
          updated_at: string | null
          version: number | null
          view_count: number | null
          visibility: string | null
        }
        Insert: {
          author_id: string
          average_rating?: number | null
          category_id?: string | null
          co_authors?: string[] | null
          cook_time_minutes?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          filter_tag_ids?: string[] | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          ingredients_note?: string | null
          is_featured?: boolean | null
          is_latest_version?: boolean | null
          last_made_at?: string | null
          like_count?: number | null
          made_count?: number | null
          nutrition_data?: Json | null
          original_servings?: number | null
          parent_recipe_id?: string | null
          prep_time_minutes?: number | null
          published_at?: string | null
          rating_count?: number | null
          save_count?: number | null
          scaling_notes?: string | null
          servings?: number | null
          slug: string
          source_attribution?: string | null
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          tips_and_notes?: string | null
          title: string
          total_time_minutes?: number | null
          updated_at?: string | null
          version?: number | null
          view_count?: number | null
          visibility?: string | null
        }
        Update: {
          author_id?: string
          average_rating?: number | null
          category_id?: string | null
          co_authors?: string[] | null
          cook_time_minutes?: number | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string[] | null
          filter_tag_ids?: string[] | null
          id?: string
          image_alt_text?: string | null
          image_url?: string | null
          ingredients_note?: string | null
          is_featured?: boolean | null
          is_latest_version?: boolean | null
          last_made_at?: string | null
          like_count?: number | null
          made_count?: number | null
          nutrition_data?: Json | null
          original_servings?: number | null
          parent_recipe_id?: string | null
          prep_time_minutes?: number | null
          published_at?: string | null
          rating_count?: number | null
          save_count?: number | null
          scaling_notes?: string | null
          servings?: number | null
          slug?: string
          source_attribution?: string | null
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          tips_and_notes?: string | null
          title?: string
          total_time_minutes?: number | null
          updated_at?: string | null
          version?: number | null
          view_count?: number | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "recipe_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipes_parent_recipe_id_fkey"
            columns: ["parent_recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_list_items: {
        Row: {
          actual_cost: number | null
          amount: number | null
          category: string | null
          created_at: string | null
          estimated_cost: number | null
          id: string
          ingredient_name: string
          is_optional: boolean | null
          is_purchased: boolean | null
          notes: string | null
          purchased_at: string | null
          shopping_list_id: string
          sort_order: number | null
          source_recipe_ids: string[] | null
          store_section: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          amount?: number | null
          category?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          ingredient_name: string
          is_optional?: boolean | null
          is_purchased?: boolean | null
          notes?: string | null
          purchased_at?: string | null
          shopping_list_id: string
          sort_order?: number | null
          source_recipe_ids?: string[] | null
          store_section?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          amount?: number | null
          category?: string | null
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          ingredient_name?: string
          is_optional?: boolean | null
          is_purchased?: boolean | null
          notes?: string | null
          purchased_at?: string | null
          shopping_list_id?: string
          sort_order?: number | null
          source_recipe_ids?: string[] | null
          store_section?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            isOneToOne: false
            referencedRelation: "collection_shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      step_attachments: {
        Row: {
          alt_text: string | null
          attachment_type: string
          caption: string | null
          created_at: string | null
          description: string | null
          file_name: string | null
          file_size_bytes: number | null
          file_url: string
          id: string
          is_primary: boolean | null
          mime_type: string | null
          sort_order: number | null
          step_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          attachment_type: string
          caption?: string | null
          created_at?: string | null
          description?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          file_url: string
          id?: string
          is_primary?: boolean | null
          mime_type?: string | null
          sort_order?: number | null
          step_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          attachment_type?: string
          caption?: string | null
          created_at?: string | null
          description?: string | null
          file_name?: string | null
          file_size_bytes?: number | null
          file_url?: string
          id?: string
          is_primary?: boolean | null
          mime_type?: string | null
          sort_order?: number | null
          step_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "step_attachments_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "recipe_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_relationships: {
        Row: {
          child_tag_id: string
          created_at: string | null
          description: string | null
          id: string
          parent_tag_id: string
          relationship_type: string
          strength: number | null
        }
        Insert: {
          child_tag_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          parent_tag_id: string
          relationship_type: string
          strength?: number | null
        }
        Update: {
          child_tag_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          parent_tag_id?: string
          relationship_type?: string
          strength?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_relationships_child_tag_id_fkey"
            columns: ["child_tag_id"]
            isOneToOne: false
            referencedRelation: "filter_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tag_relationships_parent_tag_id_fkey"
            columns: ["parent_tag_id"]
            isOneToOne: false
            referencedRelation: "filter_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_conversions: {
        Row: {
          conversion_factor: number
          created_at: string | null
          from_unit: string
          id: string
          ingredient_name: string | null
          ingredient_specific: boolean | null
          notes: string | null
          to_unit: string
        }
        Insert: {
          conversion_factor: number
          created_at?: string | null
          from_unit: string
          id?: string
          ingredient_name?: string | null
          ingredient_specific?: boolean | null
          notes?: string | null
          to_unit: string
        }
        Update: {
          conversion_factor?: number
          created_at?: string | null
          from_unit?: string
          id?: string
          ingredient_name?: string | null
          ingredient_specific?: boolean | null
          notes?: string | null
          to_unit?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_data: Json | null
          activity_description: string | null
          activity_title: string
          activity_type: string
          comment_count: number | null
          created_at: string | null
          engagement_score: number | null
          id: string
          like_count: number | null
          related_collection_id: string | null
          related_group_id: string | null
          related_recipe_id: string | null
          related_user_id: string | null
          relevance_score: number | null
          share_count: number | null
          updated_at: string | null
          user_id: string
          visibility: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_description?: string | null
          activity_title: string
          activity_type: string
          comment_count?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          like_count?: number | null
          related_collection_id?: string | null
          related_group_id?: string | null
          related_recipe_id?: string | null
          related_user_id?: string | null
          relevance_score?: number | null
          share_count?: number | null
          updated_at?: string | null
          user_id: string
          visibility?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_description?: string | null
          activity_title?: string
          activity_type?: string
          comment_count?: number | null
          created_at?: string | null
          engagement_score?: number | null
          id?: string
          like_count?: number | null
          related_collection_id?: string | null
          related_group_id?: string | null
          related_recipe_id?: string | null
          related_user_id?: string | null
          relevance_score?: number | null
          share_count?: number | null
          updated_at?: string | null
          user_id?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_related_collection_id_fkey"
            columns: ["related_collection_id"]
            isOneToOne: false
            referencedRelation: "recipe_collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_related_group_id_fkey"
            columns: ["related_group_id"]
            isOneToOne: false
            referencedRelation: "user_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_related_recipe_id_fkey"
            columns: ["related_recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          addressee_id: string
          allow_recipe_suggestions: boolean | null
          can_edit_shared_recipes: boolean | null
          can_see_private_recipes: boolean | null
          connection_strength: number | null
          connection_type: string | null
          created_at: string | null
          family_notes: string | null
          family_relationship: string | null
          id: string
          is_close_friend: boolean | null
          last_interaction_at: string | null
          requested_at: string | null
          requester_id: string
          responded_at: string | null
          share_cooking_activity: boolean | null
          share_recipe_activity: boolean | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          addressee_id: string
          allow_recipe_suggestions?: boolean | null
          can_edit_shared_recipes?: boolean | null
          can_see_private_recipes?: boolean | null
          connection_strength?: number | null
          connection_type?: string | null
          created_at?: string | null
          family_notes?: string | null
          family_relationship?: string | null
          id?: string
          is_close_friend?: boolean | null
          last_interaction_at?: string | null
          requested_at?: string | null
          requester_id: string
          responded_at?: string | null
          share_cooking_activity?: boolean | null
          share_recipe_activity?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          addressee_id?: string
          allow_recipe_suggestions?: boolean | null
          can_edit_shared_recipes?: boolean | null
          can_see_private_recipes?: boolean | null
          connection_strength?: number | null
          connection_type?: string | null
          created_at?: string | null
          family_notes?: string | null
          family_relationship?: string | null
          id?: string
          is_close_friend?: boolean | null
          last_interaction_at?: string | null
          requested_at?: string | null
          requester_id?: string
          responded_at?: string | null
          share_cooking_activity?: boolean | null
          share_recipe_activity?: boolean | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_groups: {
        Row: {
          activity_score: number | null
          allow_challenges: boolean | null
          allow_events: boolean | null
          allow_recipe_sharing: boolean | null
          avatar_url: string | null
          color_theme: string | null
          cooking_level: string | null
          cover_image_url: string | null
          created_at: string | null
          creator_id: string | null
          cuisine_focus: string[] | null
          description: string | null
          dietary_focus: string[] | null
          group_type: string | null
          guidelines: string | null
          id: string
          is_featured: boolean | null
          is_location_based: boolean | null
          language: string | null
          last_activity_at: string | null
          location_city: string | null
          location_coordinates: unknown | null
          location_country: string | null
          member_count: number | null
          name: string
          recipe_count: number | null
          require_approval_for_posts: boolean | null
          rules: string | null
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          activity_score?: number | null
          allow_challenges?: boolean | null
          allow_events?: boolean | null
          allow_recipe_sharing?: boolean | null
          avatar_url?: string | null
          color_theme?: string | null
          cooking_level?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          creator_id?: string | null
          cuisine_focus?: string[] | null
          description?: string | null
          dietary_focus?: string[] | null
          group_type?: string | null
          guidelines?: string | null
          id?: string
          is_featured?: boolean | null
          is_location_based?: boolean | null
          language?: string | null
          last_activity_at?: string | null
          location_city?: string | null
          location_coordinates?: unknown | null
          location_country?: string | null
          member_count?: number | null
          name: string
          recipe_count?: number | null
          require_approval_for_posts?: boolean | null
          rules?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          activity_score?: number | null
          allow_challenges?: boolean | null
          allow_events?: boolean | null
          allow_recipe_sharing?: boolean | null
          avatar_url?: string | null
          color_theme?: string | null
          cooking_level?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          creator_id?: string | null
          cuisine_focus?: string[] | null
          description?: string | null
          dietary_focus?: string[] | null
          group_type?: string | null
          guidelines?: string | null
          id?: string
          is_featured?: boolean | null
          is_location_based?: boolean | null
          language?: string | null
          last_activity_at?: string | null
          location_city?: string | null
          location_coordinates?: unknown | null
          location_country?: string | null
          member_count?: number | null
          name?: string
          recipe_count?: number | null
          require_approval_for_posts?: boolean | null
          rules?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          blocked_filter_tags: string[] | null
          budget_preference: string | null
          cooking_time_preference: number | null
          created_at: string | null
          difficulty_preference: string | null
          equipment_owned: string[] | null
          id: string
          meal_planning_preferences: Json | null
          notification_preferences: Json | null
          pantry_staples: string[] | null
          preferred_filter_tags: string[] | null
          serving_size_preference: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          blocked_filter_tags?: string[] | null
          budget_preference?: string | null
          cooking_time_preference?: number | null
          created_at?: string | null
          difficulty_preference?: string | null
          equipment_owned?: string[] | null
          id?: string
          meal_planning_preferences?: Json | null
          notification_preferences?: Json | null
          pantry_staples?: string[] | null
          preferred_filter_tags?: string[] | null
          serving_size_preference?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          blocked_filter_tags?: string[] | null
          budget_preference?: string | null
          cooking_time_preference?: number | null
          created_at?: string | null
          difficulty_preference?: string | null
          equipment_owned?: string[] | null
          id?: string
          meal_planning_preferences?: Json | null
          notification_preferences?: Json | null
          pantry_staples?: string[] | null
          preferred_filter_tags?: string[] | null
          serving_size_preference?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_recipe_interaction: {
        Args: {
          user_id_param: string
          recipe_id_param: string
          interaction_type_param: string
          rating_param?: number
          comment_param?: string
          source_param?: string
        }
        Returns: string
      }
      add_recipe_to_collection: {
        Args: {
          collection_id_param: string
          recipe_id_param: string
          user_id_param: string
          planned_date_param?: string
          meal_type_param?: string
        }
        Returns: string
      }
      are_friends: {
        Args: { user1_id: string; user2_id: string }
        Returns: boolean
      }
      can_edit_recipe: {
        Args: { recipe_id: string; user_id: string }
        Returns: boolean
      }
      cleanup_old_notifications: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      complete_timer: {
        Args: { timer_id_param: string; user_id_param: string }
        Returns: boolean
      }
      convert_unit: {
        Args: {
          amount_param: number
          from_unit_param: string
          to_unit_param: string
          ingredient_name_param?: string
        }
        Returns: number
      }
      create_cooking_group: {
        Args: {
          creator_id_param: string
          group_name: string
          description_param?: string
          group_type_param?: string
        }
        Returns: string
      }
      create_notification: {
        Args: {
          recipient_id_param: string
          sender_id_param: string
          notification_type_param: string
          title_param: string
          message_param: string
          related_recipe_id_param?: string
          related_user_id_param?: string
          related_group_id_param?: string
          priority_param?: string
        }
        Returns: string
      }
      create_user_activity: {
        Args: {
          user_id_param: string
          activity_type_param: string
          activity_title_param: string
          activity_description_param?: string
          related_recipe_id_param?: string
          related_user_id_param?: string
          visibility_param?: string
        }
        Returns: string
      }
      generate_collection_slug: {
        Args: { collection_name: string; owner_id_param: string }
        Returns: string
      }
      generate_recipe_slug: {
        Args: { recipe_title: string }
        Returns: string
      }
      generate_shopping_list_from_collection: {
        Args: {
          collection_id_param: string
          user_id_param: string
          date_start?: string
          date_end?: string
        }
        Returns: string
      }
      get_active_timers: {
        Args: { user_id_param: string }
        Returns: {
          timer_id: string
          recipe_title: string
          step_title: string
          timer_name: string
          remaining_seconds: number
          status: string
          started_at: string
        }[]
      }
      get_unread_notification_count: {
        Args: { user_id_param: string }
        Returns: number
      }
      get_user_activity_feed: {
        Args: {
          user_id_param: string
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          activity_id: string
          user_id: string
          username: string
          display_name: string
          activity_type: string
          activity_title: string
          activity_description: string
          created_at: string
          like_count: number
          comment_count: number
        }[]
      }
      get_user_basic_stats_v2: {
        Args: { user_id_param: string }
        Returns: Json
      }
      get_user_collection_stats: {
        Args: { user_id_param: string }
        Returns: Json
      }
      get_user_friends: {
        Args: { user_id_param: string }
        Returns: {
          friend_id: string
          friend_username: string
          friend_display_name: string
          connection_type: string
          family_relationship: string
          last_interaction_at: string
        }[]
      }
      get_user_profile_with_stats_safe: {
        Args: { user_id_param: string }
        Returns: Json
      }
      get_user_recipe_count: {
        Args: { user_id_param: string }
        Returns: number
      }
      get_user_recipe_interactions: {
        Args: { user_id_param: string; recipe_id_param: string }
        Returns: {
          interaction_type: string
          rating: number
          created_at: string
        }[]
      }
      get_user_recipe_stats: {
        Args: { user_id_param: string }
        Returns: Json
      }
      get_user_social_stats_safe: {
        Args: { user_id_param: string }
        Returns: Json
      }
      group_similar_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      increment_ingredient_usage: {
        Args: { ingredient_name_param: string }
        Returns: undefined
      }
      increment_recipe_views: {
        Args: { recipe_id: string }
        Returns: undefined
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      join_challenge: {
        Args: { challenge_id_param: string; user_id_param: string }
        Returns: boolean
      }
      join_group: {
        Args: { group_id_param: string; user_id_param: string }
        Returns: boolean
      }
      mark_notifications_read: {
        Args: { user_id_param: string; notification_ids?: string[] }
        Returns: number
      }
      respond_to_friend_request: {
        Args: {
          connection_id_param: string
          user_id_param: string
          response: string
        }
        Returns: boolean
      }
      search_ingredients: {
        Args: { search_term: string; limit_count?: number }
        Returns: {
          id: string
          name: string
          category: string
          common_names: string[]
          usage_count: number
        }[]
      }
      send_friend_request: {
        Args: {
          requester_id_param: string
          addressee_id_param: string
          connection_type_param?: string
        }
        Returns: string
      }
      should_send_notification: {
        Args: { user_id_param: string; notification_type_param: string }
        Returns: boolean
      }
      start_cooking_attempt: {
        Args: {
          user_id_param: string
          recipe_id_param: string
          servings_param?: number
        }
        Returns: string
      }
      start_cooking_timer: {
        Args: {
          user_id_param: string
          recipe_id_param: string
          step_id_param: string
          timer_name_param: string
          duration_seconds_param: number
        }
        Returns: string
      }
      toggle_timer_status: {
        Args: { timer_id_param: string; user_id_param: string }
        Returns: string
      }
      update_collection_metrics: {
        Args: { collection_id_param: string }
        Returns: undefined
      }
      update_group_member_count: {
        Args: { group_id_param: string }
        Returns: undefined
      }
      update_recipe_engagement_counts: {
        Args: { recipe_id_param: string }
        Returns: undefined
      }
      user_has_accepted_current_terms: {
        Args: { user_id_param: string }
        Returns: boolean
      }
      validate_step_sequence: {
        Args: { recipe_id_param: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
