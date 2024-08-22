import React, { useEffect, useState } from "react";
import { fetchTracks, createTrack, Track } from "../services/TrackService";
import TrackDialog from "../components/TrackDialog";

const TrackPage = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Form state
  const [type, setType] = useState("");
  const [shape, setShape] = useState("");
  const [surface, setSurface] = useState("");
  const [length, setLength] = useState("");
  const [lanes, setLanes] = useState("");

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (err) {
        setError("Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    // Reset form fields when the dialog is closed
    setType("");
    setShape("");
    setSurface("");
    setLength("");
    setLanes("");
  };

  const handleFormSubmit = async () => {
    try {
      // Create new track using the service
      const newTrack = await createTrack({
        id: 0, // Backend will handle ID assignment
        type,
        shape,
        surface,
        length,
        lanes,
      });

      // Update the tracks list with the newly created track
      setTracks((prevTracks) => [...prevTracks, newTrack]);
      handleDialogClose(); // Close dialog
    } catch (err) {
      setError("Failed to create track");
    }
  };

  return (
    <div>
      <h1>Tracks</h1>
      <button onClick={handleDialogOpen}>Add Track</button>
      <TrackDialog open={dialogOpen} onClose={handleDialogClose} title="Create New Track">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <label>
            Type:
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
          </label>
          <br />
          <label>
            Shape:
            <input type="text" value={shape} onChange={(e) => setShape(e.target.value)} />
          </label>
          <br />
          <label>
            Surface:
            <input type="text" value={surface} onChange={(e) => setSurface(e.target.value)} />
          </label>
          <br />
          <label>
            Length:
            <input type="text" value={length} onChange={(e) => setLength(e.target.value)} />
          </label>
          <br />
          <label>
            Lanes:
            <input type="text" value={lanes} onChange={(e) => setLanes(e.target.value)} />
          </label>
          <div className="dialog-footer">
            <button type="button" onClick={handleDialogClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </TrackDialog>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <h2>{track.type}</h2>
            <p>Shape: {track.shape}</p>
            <p>Surface: {track.surface}</p>
            <p>Length: {track.length}</p>
            <p>Lanes: {track.lanes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackPage;
