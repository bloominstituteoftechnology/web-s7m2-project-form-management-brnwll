// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]
const initialFormValues = { fname: "", lname: "", bio: "" }

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null) // id of member we are editing
  const [formValues, setFormValues] = useState(initialFormValues)

  useEffect(() => {
    const editingMember = members.find(member => member.id === editing)
    editing
      ? setFormValues(editingMember)
      : setFormValues(initialFormValues)
  }, [editing])

  const onChange = evt => {
    const { name, value } = evt.target
    setFormValues({ ...formValues, [name]: value })
  }
  const edit = id => setEditing(id)
  const submitNewMember = () => {
    setMembers(members.concat({ ...formValues, id: getId()}))
    setFormValues(initialFormValues)
  }
  const editExistingMember = () => {
    setMembers(members.map(m => m.id === editing ? { ...formValues, id: editing } : m))
    setEditing(null);
  }
  const onSubmit = evt => {
    evt.preventDefault();
    // TODO: add form validation in future
    editing ? editExistingMember() : submitNewMember()
  }
  return (
    <div>
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Type First Name"
              onChange={onChange}
              value={formValues.fname}
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input 
              id="lname" 
              name="lname" 
              type="text" 
              placeholder="Type Last Name" 
              onChange={onChange}
              value={formValues.lname}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea 
              id="bio" 
              name="bio" 
              placeholder="Type Bio" 
              onChange={onChange} 
              value={formValues.bio}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
