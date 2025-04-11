from datetime import datetime, timedelta
import uuid
import random

# Parameters
start_date = datetime(2025, 3, 31)
end_date = datetime(2025, 4, 4)
start_time = timedelta(hours=8, minutes=0)  # De 8h à 20h
slot_duration = timedelta(minutes=15)
slots_per_day = 48  # 12h * 4 slots/h

# Circuits
circuits = {
    "45e11ba5-9136-48aa-a11b-a59136b8aa38": "A",
    "1a945660-cef6-4e73-9456-60cef62e734f": "B",
    "7c9c6893-7402-48df-9c68-937402f8df02": "C"
}


def determine_max_size(from_dt):
    hour = from_dt.hour

    # Fermé avant 8h ou après 20h (normalement déjà géré par slots_per_day)
    if hour < 8 or hour >= 20:
        return 0

    # Week-end - plus de disponibilités
    if from_dt.weekday() >= 5:  # 5 = samedi, 6 = dimanche
        if 10 <= hour < 12: return random.choice([0, 0, 0, 4, 5])  # Matin week-end
        if 12 <= hour < 18: return random.choice([6, 7, 8, 9, 10])  # Après-midi week-end
        if 18 <= hour < 20: return random.choice([4, 5, 6, 7])  # Soir week-end

    # Semaine (lundi-vendredi)
    if hour < 10: return 0  # Fermé avant 10h en semaine
    if 10 <= hour < 12: return random.choice([0, 0, 2, 3, 4])  # Matinée
    if 12 <= hour < 14: return random.choice([5, 6, 7, 8])  # Déjeuner
    if 14 <= hour < 17: return random.choice([3, 4, 5, 6])  # Après-midi
    if 17 <= hour < 19: return random.choice([6, 7, 8, 9])  # Soirée
    if 19 <= hour < 20: return random.choice([0, 0, 2, 3])  # Fin de journée

    return 0  # Par défaut


# Generate all INSERT values
values = []
for circuit_id, prefix in circuits.items():
    current_date = start_date
    while current_date <= end_date:
        for i in range(slots_per_day):
            from_dt = datetime.combine(current_date, datetime.min.time()) + start_time + i * slot_duration
            to_dt = from_dt + slot_duration
            max_size = determine_max_size(from_dt)

            session_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{prefix}-{from_dt.isoformat()}"))
            values.append(f"('{session_id}','{circuit_id}','{from_dt}','{to_dt}',{max_size})")
        current_date += timedelta(days=1)

# Format as SQL
sql_output = "INSERT INTO KartingSessionSlot (session_id, circuit_id, from_date, to_date, maxSize) VALUES\n"
sql_output += ",\n".join(values) + ";"

# Write to file
with open("karting_slots_full.sql", "w", encoding="utf-8") as f:
    f.write(sql_output)

# Stats
total_slots = len(values)
available_slots = sum(1 for v in values if "',0)" not in v)
closed_slots = total_slots - available_slots

# Print success message
print("Fichier 'karting_slots_full.sql' généré avec succès !")