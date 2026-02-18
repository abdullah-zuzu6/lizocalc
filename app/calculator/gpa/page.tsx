'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

interface Grade {
  id: string
  name: string
  grade: number
  credits: number
}

export default function GPACalculator() {
  const [grades, setGrades] = useState<Grade[]>([
    { id: '1', name: 'Mathematics', grade: 4.0, credits: 3 },
    { id: '2', name: 'English', grade: 3.8, credits: 3 },
  ])
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['gpa']?.data?.grades) {
      setGrades(history['gpa'].data.grades)
    }
  }, [])

  // Save to cookies whenever grades change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('gpa', { grades })
    }
  }, [grades, isMounted])

  const calculateGPA = () => {
    const totalPoints = grades.reduce((sum, g) => sum + g.grade * g.credits, 0)
    const totalCredits = grades.reduce((sum, g) => sum + g.credits, 0)
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const addGrade = () => {
    setGrades([...grades, { id: Date.now().toString(), name: '', grade: 4.0, credits: 3 }])
  }

  const updateGrade = (id: string, field: string, value: any) => {
    setGrades(grades.map(g => g.id === id ? { ...g, [field]: value } : g))
  }

  const removeGrade = (id: string) => {
    setGrades(grades.filter(g => g.id !== id))
  }

  const gpa = calculateGPA()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <BackButton href="/calculators/other" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GPA Calculator</h1>
          <p className="text-lg text-muted-foreground">Calculate your Grade Point Average</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold">Course Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Grade</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Credits</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id} className="border-b border-border hover:bg-background/50 transition-colors">
                    <td className="py-3 px-4">
                      <input type="text" value={grade.name} onChange={(e) => updateGrade(grade.id, 'name', e.target.value)} placeholder="Course name" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm" />
                    </td>
                    <td className="py-3 px-4">
                      <select value={grade.grade} onChange={(e) => updateGrade(grade.id, 'grade', Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm">
                        {[4.0, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0].map((g) => (
                          <option key={g} value={g}>{g.toFixed(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <input type="number" value={grade.credits} onChange={(e) => updateGrade(grade.id, 'credits', Number(e.target.value))} min="1" max="6" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground text-sm" />
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => removeGrade(grade.id)} className="p-2 hover:bg-destructive/10 hover:text-destructive transition-colors rounded-lg">
                        <X className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={addGrade} className="w-full py-2 px-4 border border-border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-colors font-medium text-sm">
            + Add Course
          </button>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center mb-8">
          <p className="text-muted-foreground text-lg mb-2">Your GPA</p>
          <p className="text-6xl font-bold text-primary">{gpa}</p>
          <p className="text-sm text-muted-foreground mt-4">{grades.length} course{grades.length !== 1 ? 's' : ''} • {grades.reduce((s, g) => s + g.credits, 0)} total credits</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About GPA</h3>
          </div>
          <p className="text-muted-foreground">GPA is calculated by multiplying each grade by its credit hours, summing all the weighted grades, and dividing by total credit hours. Standard GPA scale is 4.0 for A.</p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
